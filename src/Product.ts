export default class Product {
	name: string;
	price: number;

	constructor(name: string, price: number){
		this.name = name;
		this.price = price;
	}

	getName(): string {
		return this.name;
	}

	getPrice(): number {
		return this.price;
	}
}
