import Product from './Product'

export default class LineItem {
	product: Product;
	quantity: number;
	constructor(product: Product, quantity: number) {
		this.product = product;
		this.quantity = quantity;
	}
}
