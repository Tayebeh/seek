import PricingRule  from './PricingRule';
import Product from './Product';
import Order from './Order';

export default class Deal implements PricingRule {
	dealQuantity: number;
	discountedQuantity: number;
	product: Product;

	constructor(actualQuantity: number, dealQuantity: number, product: Product){
		this.dealQuantity = actualQuantity;
		this.discountedQuantity = dealQuantity;
		this.product = product;
	}

	calculateDiscount(order: Order): number {

		let totalDisscount: number = 0;
		if (order && order.itemList) {
			order.itemList.forEach((item: any) => {
				if (item.product === this.product) {
					const quantityForDisscount = Math.trunc(item.quantity / this.dealQuantity);
					totalDisscount = this.product.price * quantityForDisscount * (this.dealQuantity - this.discountedQuantity);
				}
			});
		}
		return totalDisscount;
	}

}
