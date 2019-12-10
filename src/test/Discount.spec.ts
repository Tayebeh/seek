import Discount from '../Discount';
import Order from '../Order';
import Customer from '../Customer';
import Product from '../Product';
import PricingRule from '../PricingRule';
import LineItem from '../LineItem';


const standoutProduct: Product = new Product('standout', 322.99);
const premiumProduct: Product = new Product('premium', 394.99);

describe('should test calculateDiscount for discount class', () => {
    test('should calculate the correct discount for given product', () => {

        const discount = new Discount(10, premiumProduct);
        const pricingRules: PricingRule[] = [discount];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(premiumProduct, 1);
        order.add(LineItem1);

        expect(discount.calculateDiscount(order)).toEqual(39.499);
    });

    test('should calculate the correct discount for multiple products with multiple quantities', () => {

        const discount1 = new Discount(10, premiumProduct);
        const discount2 = new Discount(20, standoutProduct);
        const pricingRules: PricingRule[] = [discount1, discount2];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);

        const order1 = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(premiumProduct, 1);
        order1.add(LineItem1);
        expect(discount1.calculateDiscount(order1)).toEqual(39.499);

        const order2 = new Order(customer.getPricingRules());
        const LineItem2 = new LineItem(standoutProduct, 5);
        order2.add(LineItem2);
        expect(discount2.calculateDiscount(order2)).toEqual(322.99);
    });

    test('should return zero discount if order is null', () => {

        const order = null;
        const discount = new Discount(10, premiumProduct);

        expect(discount.calculateDiscount(order)).toEqual(0);
    });

    test('should return zero discount if order is undefined', () => {

        const order = undefined;
        const discount = new Discount(10, premiumProduct);

        expect(discount.calculateDiscount(order)).toEqual(0);
    });

    test('should return zero discount if no order does not include line item', () => {

        const discount = new Discount(10, premiumProduct);
        const pricingRules: PricingRule[] = [discount];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());

        expect(discount.calculateDiscount(order)).toEqual(0);
    });
});
