import PricingRule  from './PricingRule';
import LineItem from './LineItem';

export default class Order {
	
	pricingRules: PricingRule[] = [];
	itemList: LineItem[] = [];


	constructor(pricingRules: PricingRule[]){
		this.pricingRules = pricingRules;
	}

	add(item: LineItem) {
		this.itemList.push(item);
	}

	getItemList(){
		return this.itemList;
	}

	getPricingRules(){
		return this.pricingRules;
	}

	/**
	 * calculates the total discount for order
	 * @returns {string}
	 */
	total(): string {
		let totalWithoutDiscount: number = 0;
		let sumOfDiscounts: number = 0;
		this.getItemList().forEach((item) => {
			totalWithoutDiscount = totalWithoutDiscount + (item.product.getPrice() * item.quantity);
		});

		this.getPricingRules().forEach((rule: PricingRule) => {
			sumOfDiscounts = sumOfDiscounts + rule.calculateDiscount(this);
		});
		return  `$${Math.floor((totalWithoutDiscount - sumOfDiscounts) * 100) / 100}`;
	}
}
