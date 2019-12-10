import Product from './Product';
import PricingRule  from './PricingRule';
import Order from './Order';

export default class Discount implements PricingRule {
    discountPercent: number;
    product: Product;

    constructor(discountPercent: number, product: Product) {
        this.discountPercent = discountPercent;
        this.product = product;
    }

    calculateDiscount(order: Order): number {
        let totalDiscount: number = 0;
        if (order && order.itemList) {
            order.itemList.forEach((item) => {
                if (item.product === this.product) {
                    const totalPrice = this.product.price * item.quantity;
                    totalDiscount = totalPrice * (this.discountPercent / 100);
                }
            });
        }
        return totalDiscount;
    }
}
