export const pathMap = {
  eth: "m/44'/60'/0'/0/",
  bsc: "m/44'/60'/0'/0/",
  matic: "m/44'/60'/0'/0/",
  btc: "m/84'/0'/0'/0/",
  ltc: "m/84'/2'/0'/0/",
  bch: "m/44'/145'/0'/0/",
  doge: "m/44'/3'/0'/0/",
};

/**
 *
 * @param {keyof typeof pathMap} network
 * @param {number} index
 * @returns
 */
export const generateDerivationPath = (network, index) =>
  pathMap[network] + index;
