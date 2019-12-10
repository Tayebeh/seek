import Order from '../Order';
import Customer from '../Customer';
import Product from '../Product';
import Deal from '../Deal';
import PricingRule from '../PricingRule';
import LineItem from '../LineItem';


const standoutProduct: Product = new Product('standout', 322.99);
const premiumProduct: Product = new Product('premium', 394.99);

describe('should test calculateDiscount for deal class', () => {
    test('should calculate the correct deal discount for a given product', () => {

        const discount = new Deal(5, 3, premiumProduct);
        const pricingRules: PricingRule[] = [discount];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(premiumProduct, 6);
        order.add(LineItem1);

        expect(discount.calculateDiscount(order)).toEqual(789.98);
    });

    test('should calculate the correct deal discount for multiple products with multiple quantities', () => {

        const discount1 = new Deal(5, 3, premiumProduct);
        const discount2 = new Deal(3, 2, standoutProduct);
        const pricingRules: PricingRule[] = [discount1, discount2];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);

        const order1 = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(premiumProduct, 6);
        order1.add(LineItem1);
        expect(discount1.calculateDiscount(order1)).toEqual(789.98);

        const order2 = new Order(customer.getPricingRules());
        const LineItem2 = new LineItem(standoutProduct, 10);
        order2.add(LineItem2);
        expect(discount2.calculateDiscount(order2)).toEqual(968.97);
    });
    test('should return zero deal discount if order is null', () => {

        const order = null;
        const discount = new Deal(10, 4, premiumProduct);

        expect(discount.calculateDiscount(order)).toEqual(0);
    });

    test('should return zero deal discount if order is undefined', () => {

        const order = undefined;
        const discount = new Deal(10, 4, premiumProduct);

        expect(discount.calculateDiscount(order)).toEqual(0);
    });

    test('should return zero deal discount if no order does not include line item', () => {

        const discount = new Deal(10, 4, premiumProduct);
        const pricingRules: PricingRule[] = [discount];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());

        expect(discount.calculateDiscount(order)).toEqual(0);
    });
});
