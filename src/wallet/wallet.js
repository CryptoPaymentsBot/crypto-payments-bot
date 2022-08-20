import bip32 from "bip32";
import bip39 from "bip39";
import bitcoin from "bitcoinjs-lib";
import cashAddr from "cashaddrjs";
import { Wallet as EthersWallet } from "ethers";
import * as tinySecp256k1 from "tiny-secp256k1";

import {
  bitcoinCashNetwork,
  dogecoinNetwork,
  litecoinNetwork,
} from "./coininfo.js";
import { generateDerivationPath } from "./path.js";

/**
 * @type {Record<string, (params: {account: EthersWallet, root: import("bip32").BIP32Interface, index: number}) => Promise<string>>}
 */
const chains = {
  eth: async ({ account: { address } }) => address,
  matic: async ({ account: { address } }) => address,
  bsc: async ({ account: { address } }) => address,

  btc: async ({ root, index }) => {
    const account = root.derivePath(generateDerivationPath("btc", index));
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: account.publicKey,
      network: bitcoin.networks.bitcoin,
    });

    if (!address) throw new Error("BTC address is undefined");

    return address;
  },
  ltc: async ({ root, index }) => {
    const account = root.derivePath(generateDerivationPath("ltc", index));
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: account.publicKey,
      network: litecoinNetwork,
    });

    if (!address) throw new Error("LTC address is undefined");

    return address;
  },
  doge: async ({ root, index }) => {
    const account = root.derivePath(generateDerivationPath("doge", index));
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: account.publicKey,
      network: dogecoinNetwork,
    });

    if (!address) throw new Error("DOGE address is undefined");

    return address;
  },
  bch: async ({ root, index }) => {
    const account = root.derivePath(generateDerivationPath("bch", index));
    const { hash } = bitcoin.payments.p2wpkh({
      pubkey: account.publicKey,
      network: bitcoinCashNetwork,
    });

    if (!hash) throw new Error("BCH hash is undefined");

    return cashAddr.encode("bitcoincash", "P2PKH", hash);
  },
};

export class Wallet {
  static async createRandom(index = 0) {
    const account = EthersWallet.createRandom({
      locale: "en",
      path: generateDerivationPath("eth", index),
    });

    const {
      mnemonic: { phrase: mnemonic },
    } = account;

    const seed = await bip39.mnemonicToSeed(mnemonic);
    // @ts-ignore
    const root = bip32.BIP32Factory(tinySecp256k1).fromSeed(seed);

    return await Wallet.getAddresses(index, account, root);
  }

  /**
   *
   * @param {string} mnemonic
   * @param {number} index
   * @returns
   */
  static async fromMnemonic(mnemonic, index = 0) {
    const account = EthersWallet.fromMnemonic(
      mnemonic,
      generateDerivationPath("eth", index),
    );

    const seed = await bip39.mnemonicToSeed(mnemonic);
    // @ts-ignore
    const root = bip32.BIP32Factory(tinySecp256k1).fromSeed(seed);

    return await Wallet.getAddresses(index, account, root);
  }

  /**
   *
   * @param {number} index
   * @param {EthersWallet} account
   * @param {import("bip32").BIP32Interface} root
   * @returns
   */
  static async getAddresses(index, account, root) {
    return Object.fromEntries(
      (
        await Promise.all(
          Object.entries(chains).map(async ([chain, mapFunction]) => [
            `${chain}Address`,
            await mapFunction({ account, root, index }),
          ]),
        )
      ).concat([["mnemonic", account.mnemonic.phrase]]),
    );
  }
}
