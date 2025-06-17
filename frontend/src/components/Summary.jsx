import styles from './Summary.module.css'

export default function Summary(){
    
    return(
        <>
            <div className={styles.parentContainer}>
                <div className={styles.headerContainer}>
                    <h3>Summary</h3>
                </div>
                <div className={styles.priceListing}>
                    <hr />
                    <div className={styles.detailContainer}>
                        <p>Subtotal</p>
                        <p>yoyo</p>
                    </div>
                    <div className={styles.detailContainer}>
                        <p>Subtotal</p>
                        <p>yoyo</p>
                    </div>
                    <div className={styles.detailContainer}>
                        <p>Subtotal</p>
                        <p>yoyo</p>
                    </div>
                    <div className={styles.detailContainer}>
                        <p>Subtotal</p>
                        <p>yoyo</p>
                    </div>
                    <hr />
                    <div className={styles.detailContainer}>
                        <p>Subtotal</p>
                        <p>yoyo</p>
                    </div>
                    <hr />
                </div>
                <div className={styles.buttonContainer}>
                    <button>Checkout</button>
                </div>
                <hr />
                <div className={styles.helpContainer}>
                    <p>Need help?</p>
                </div>
            </div>
        </>
    )
}

;