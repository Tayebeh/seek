import Discount from '../Discount';
import Order from '../Order';
import Customer from '../Customer';
import Product from '../Product';
import Deal from '../Deal';
import PricingRule from '../PricingRule';
import LineItem from '../LineItem';


const classicProduct: Product = new Product('classic', 269.99);
const standoutProduct: Product = new Product('standout', 322.99);
const premiumProduct: Product = new Product('premium', 394.99);

describe('Should test total method', () => {
    test('should calculate the correct price for default customer with no deal or discount', () => {

        const pricingRules: PricingRule[] = [];
        const customer = new Customer('default');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(classicProduct, 1);
        const LineItem2 = new LineItem(standoutProduct, 1);
        const LineItem3 = new LineItem(premiumProduct, 1);
        order.add(LineItem1);
        order.add(LineItem2);
        order.add(LineItem3);

        expect(order.total()).toEqual('$987.97');
    });

    test('should calculate the correct price for customer with deal of 5 for the price of 4 and discount of 1.26%', () => {
        const pricingRules: PricingRule[] = [new Discount(1.26, premiumProduct), new Deal(5, 4, standoutProduct)];
        const customer = new Customer('MYER');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(standoutProduct, 6);
        const LineItem2 = new LineItem(premiumProduct, 1);
        const LineItem3 = new LineItem(classicProduct, 1);
        order.add(LineItem1);
        order.add(LineItem2);
        order.add(LineItem3);

        expect(order.total()).toEqual('$2274.95');
    });

    test('should calculate the correct deal price for customer where classic adds has a 3 for the price of 2 deal', () => {

        const pricingRules: PricingRule[] = [new Deal(3, 2, classicProduct)];
        const customer = new Customer('SecondBite');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(classicProduct, 3);
        const LineItem2 = new LineItem(premiumProduct, 1);
        order.add(LineItem1);
        order.add(LineItem2);

        expect(order.total()).toEqual('$934.97');
    });

    test('should calculate the correct discounted price for customer where stand out adds price drops to $299 per add', () => {

        const pricingRules: PricingRule[] = [new Discount(7.12, standoutProduct)];
        const customer = new Customer('Axil Coffee Roasters');
        customer.setPricingRules(pricingRules);
        const order = new Order(customer.getPricingRules());
        const LineItem1 = new LineItem(premiumProduct, 1);
        const LineItem2 = new LineItem(standoutProduct, 3);
        order.add(LineItem1);
        order.add(LineItem2);

        expect(order.total()).toEqual('$1294.96');
    });
});
