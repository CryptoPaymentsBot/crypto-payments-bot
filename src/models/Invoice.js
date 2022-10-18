import { Currency } from "./Currency.js";
import { Product } from "./Product.js";
import { User } from "./User.js";

export class Invoice {
  /**
   *
   * @param {Object} params
   * @param {string} [params.id] row uuid id
   * @param {number} params.productId connected product id
   * @param {number} params.userId user which should pay this invoice
   * @param {string} params.currencyCode currency which was used to specify amountFiat
   *
   * @param {string} params.amountFiat
   * @param {import("./RequestType.js").RequestTypeEnum[]} params.requestList list of data which will be requested before payment
   * @param {Date} params.paymentDeadline invoice expiration date
   *
   * @param {Currency} [params.currency]
   * @param {Product} [params.product]
   * @param {User} [params.user]
   *
   * @param {boolean} [params.isConfirmed=false] invoice payment status
   * @param {Date} [params.createdAt=Date()]
   * @param {import("./RequestType.js").ResponseOption[]} [params.responsesList] array of responses submitted based on requestList
   *
   * @param {number} [params.paymentTokenId] id of token selected by used
   * @param {string} [params.paymentAmount] amount to pay
   *
   *
   * @param {Date} [params.lastPaymentCheck=null] last time when payment was checked
   * @param {Date} [params.payedAt] time when payment was processed
   * @param {number} [params.payedTokenId] token used to pay
   * @param {string} [params.payedAmount] payed amount
   */
  constructor({
    id,
    productId,
    userId,
    currencyCode,
    amountFiat,
    requestList,
    paymentDeadline,
    currency,
    product,
    user,
    isConfirmed = false,
    createdAt = new Date(),
    responsesList = [],
    paymentTokenId,
    paymentAmount,
    lastPaymentCheck,
    payedAt,
    payedTokenId,
    payedAmount,
  }) {
    /**
     * @type {string | undefined} row uuid id
     */
    this.id = id;
    /**
     * @type {number} connected product id
     */
    this.productId = productId;
    /**
     * @type {number} user which should pay this invoice
     */
    this.userId = userId;
    /**
     * @type {string} currency which was used to specify amountFiat
     */
    this.currencyCode = currencyCode;
    /**
     * @type {string}
     */
    this.amountFiat = amountFiat;
    /**
     * @type {import("./RequestType.js").RequestTypeEnum[]} list of data which will be requested before payment
     */
    this.requestList = requestList;
    /**
     * @type {Date} invoice expiration date
     */
    this.paymentDeadline = paymentDeadline;
    /**
     * @type {Currency | undefined}
     */
    this.currency = currency;
    /**
     * @type {Product | undefined}
     */
    this.product = product;
    /**
     * @type {User | undefined}
     */
    this.user = user;
    /**
     * @type {boolean} invoice payment status
     */
    this.isConfirmed = isConfirmed;
    /**
     * @type {Date} invoice creation date
     */
    this.createdAt = createdAt;
    /**
     * @type {import("./RequestType.js").ResponseOption[]} array of responses submitted based on requestList
     */
    this.responsesList = responsesList;
    /**
     * @type {number | undefined} id of token selected by used
     */
    this.paymentTokenId = paymentTokenId;
    /**
     * @type {string | undefined} amount to pay
     */
    this.paymentAmount = paymentAmount;
    /**
     * @type {Date | undefined} last time when payment was checked
     */
    this.lastPaymentCheck = lastPaymentCheck;
    /**
     * @type {Date | undefined} time when payment was processed
     */
    this.payedAt = payedAt;
    /**
     * @type {number | undefined} token used to pay
     */
    this.payedTokenId = payedTokenId;
    /**
     * @type {string | undefined} payed amount
     */
    this.payedAmount = payedAmount;
  }
}
