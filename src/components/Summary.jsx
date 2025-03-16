import styles from './Summary.module.css'

export default function Summary(){
    
    return(
        <>
            <div className={styles.summaryContainer}>
            <h2 className={styles.title}>SUMMARY</h2>
            <div className={styles.details}>
                <div className={styles.row}>
                <span>Subtotal</span>
                <span>Rp. 1.500.000,00</span>
                </div>
                <div className={styles.row}>
                <span>Shipping</span>
                <span>Rp. 0,00</span>
                </div>
                <div className={styles.row}>
                <span>Sales Tax</span>
                <span>Rp. 0,00</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.row}>
                <span>Estimated Total</span>
                <span className={styles.total}>Rp. 1.500.000,00</span>
                </div>
            </div>
            <button className={styles.checkoutButton}>CHECKOUT</button>
            <p className={styles.helpText}>Need help? Call us at 0-8123-456-789</p>
            </div>
        </>
    )
}

;