import PricingRule  from './PricingRule';

export default class Customer {
	name: string;
	pricingRules: PricingRule[] = [];

	constructor(name: string) {
		this.name = name;
	}

	getPricingRules(): PricingRule[] {
		return this.pricingRules;
	}

	setPricingRules(pricingRules: PricingRule[]) {
		this.pricingRules = pricingRules;
	}
}
