import { BIP32Factory } from "bip32";
import bip39 from "bip39";
import { Wallet as EthersWallet } from "ethers";
import * as tinySecp256k1 from "tiny-secp256k1";

import { addressesMap } from "./addresses.js";
import { generateDerivationPath } from "./path.js";

/**
 * @typedef Addresses
 * @property {string} mnemonic
 * @property {string} ethAddress
 * @property {string} bscAddress
 * @property {string} maticAddress
 * @property {string} btcAddress
 * @property {string} ltcAddress
 * @property {string} dogeAddress
 * @property {string} bchAddress
 */

const bip32Factory = BIP32Factory(tinySecp256k1);

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
    const root = bip32Factory.fromSeed(seed);

    return Wallet.getAddresses(index, account, root);
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
    const root = bip32Factory.fromSeed(seed);

    return Wallet.getAddresses(index, account, root);
  }

  /**
   *
   * @param {number} index
   * @param {EthersWallet} account
   * @param {import("bip32").BIP32Interface} root
   * @returns {Promise<Addresses>}
   */
  static async getAddresses(index, account, root) {
    return Object.fromEntries(
      (
        await Promise.all(
          Object.entries(addressesMap).map(async ([chain, mapFunction]) => [
            `${chain}Address`,
            await mapFunction({ account, root, index }),
          ]),
        )
      ).concat([["mnemonic", account.mnemonic.phrase]]),
    );
  }
}

const a = await Wallet.createRandom();
