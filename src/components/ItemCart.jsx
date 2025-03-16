import styles from './ItemCart.module.css'

export default function ItemCart(){
    
    return(
        <>
    <div className={styles.cartItem}>
      <img
        src="/path-to-image.jpg" // Replace with actual image source
        alt="Batman T-Shirt"
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>BATMAN T-SHIRT SUPERHERO</h3>
          <ul className={styles.productInfo}>
            <li>Item No: 890469494485</li>
            <li>Size: XL</li>
            <li>Color: Sky Blue</li>
            <li>Qty: 1</li>
          </ul>
          <div className={styles.buttonContainer}>
            <button className={styles.editButton}>EDIT</button>
            <button className={styles.removeButton}>REMOVE</button>
          </div>
      </div>
      <span className={styles.price}>Rp. 1.500.000,00</span>
    </div>
        </>
    )
}

;