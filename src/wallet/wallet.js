import bip32 from "bip32";
import bip39 from "bip39";
import { Wallet as EthersWallet } from "ethers";
import * as tinySecp256k1 from "tiny-secp256k1";

import { addressesMap } from "./addresses.js";
import { generateDerivationPath } from "./path.js";

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
          Object.entries(addressesMap).map(async ([chain, mapFunction]) => [
            `${chain}Address`,
            await mapFunction({ account, root, index }),
          ]),
        )
      ).concat([["mnemonic", account.mnemonic.phrase]]),
    );
  }
}
