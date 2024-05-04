import React, { useState } from "react";
// @ts-ignore
import styles from "./price.module.css";
import CartItemType from "../types/CartItemType";

const bc = new BroadcastChannel('cart');

export default function Price() {
    const [cart, setCart] = useState<CartItemType[]>([]);

    bc.onmessage = (event) => {
        const data = event.data;
        if (data.action === "add") {
            const item = cart.find((cartItem: CartItemType) => cartItem.id === data.product.id);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({...data.product, quantity: 1});
            }
            setCart([...cart]);
        } else if (data.action === "remove") {
            const item = cart.find((cartItem: CartItemType) => cartItem.id === data.product.id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
                    setCart([...newCart]);
                    return;
                }
            }
            setCart([...cart]);
        } else if (data.action === "clear") {
            setCart([]);
        }
    };

    const priceOfItems = cart.reduce((acc, item) => acc + (item.quantity*item.price), 0);
    const roundedPrice = Number(priceOfItems.toFixed(2));
    const deliveryPrice = Number(roundedPrice * 0.1).toFixed(0);
    
    const tax = Number(roundedPrice * 0.2).toFixed(0);
    const sum = Number(roundedPrice) + Number(deliveryPrice) + Number(tax);
    const total = Number(sum).toFixed(2);

    return (
        <div className={styles.price}>
            <div className={styles.unit}>
                <p>Amount</p>
                <p>{roundedPrice} DKK</p>
            </div>
            <div className={styles.unit}>
                <p>Delivery</p>
                <p>{deliveryPrice} DKK</p>
            </div>
            <div className={styles.unit}>
                <p>Tax</p>
                <p data-testid="tax">{tax} DKK</p>
            </div>
            <hr />
            <div className={`${styles.unit} ${styles.total}`}>
                <p>Total</p>
                <p data-testid="total" id="grand_total">{total} DKK</p>
            </div>
            <div className={`${styles.unit} ${styles.terms}`}>
                <input type="checkbox" name="terms" />
                <p className={styles["terms-text"]}>I have read and agreed to the terms.</p>
            </div>
            <button className={styles["price-button"]}>Submit order</button>
        </div>
    );
}