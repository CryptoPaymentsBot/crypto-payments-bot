import bitcoin from "bitcoinjs-lib";
import cashAddr from "cashaddrjs";
import { Wallet as EthersWallet } from "ethers";

import {
  bitcoinCashNetwork,
  dogecoinNetwork,
  litecoinNetwork,
} from "./coininfo.js";
import { generateDerivationPath } from "./path.js";

/**
 * @type {Record<string, (params: {account: EthersWallet, root: import("bip32").BIP32Interface, index: number}) => Promise<string>>}
 */
export const addressesMap = {
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
