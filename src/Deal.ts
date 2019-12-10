import PricingRule  from './PricingRule';
import Product from './Product';
import Order from './Order';

export default class Deal implements PricingRule {
	actualQuantity: number;
	dealQuantity: number;
	product: Product;

	constructor(actualQuantity: number, dealQuantity: number, product: Product){
		this.actualQuantity = actualQuantity;
		this.dealQuantity = dealQuantity;
		this.product = product;
	}

	calculateDiscount(order: Order): number {

		let totalDiscount: number = 0;
		if (order && order.itemList) {
			order.itemList.forEach((item: any) => {
				if (item.product === this.product) {
					const quantityForDiscount = Math.trunc(item.quantity / this.actualQuantity);
					totalDiscount = this.product.price * quantityForDiscount * (this.actualQuantity - this.dealQuantity);
				}
			});
		}
		return totalDiscount;
	}

}
