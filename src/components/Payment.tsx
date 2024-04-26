import React from "react";
import Form from "./Form.tsx";
import Price from "./Price.tsx";
// @ts-ignore
import styles from "./payment.module.css";

export default function Payment() {
    return (
        <div className={styles["payment-container"]}>
            <Form />
            <Price />
        </div>
    )
}