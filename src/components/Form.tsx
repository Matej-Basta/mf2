import React from "react";
// @ts-ignore
import styles from "./form.module.css";

export default function Form() {
    return (
        <form className={styles.form}>
            <div>
                <label>Card number</label>
                <input className={styles.input} type="text" name="card-number"></input>
            </div>
            <div className={styles.doubleField}>
                <div className={styles["doubleField-field"]}>
                    <label>Expiration date</label>
                    <input className={styles.input} type="text" name="expiration-date"></input>
                </div>
                <div className={styles["doubleField-field"]}>
                    <label>CVC</label>
                    <input className={styles.input} type="text" name="cvc"></input>
                </div>
            </div>
            <div>
                <label>Owner</label>
                <input className={styles.input} type="text" name="owner"></input>
            </div>
        </form>
    )
}