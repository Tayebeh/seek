import Order from './Order';
export default interface PricingRule {
	/**
	 * calculates the discount total discount for product
	 */
	calculateDiscount:(order: Order) => number;
}
