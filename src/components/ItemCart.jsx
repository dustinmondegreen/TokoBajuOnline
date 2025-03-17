import styles from './ItemCart.module.css'

export default function ItemCart(){
    
    return(
        <>
          <div className={styles.parentContainer}>
            <div className={styles.imageContainer}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQOuXSNhx4c8pKvcysPWidz4NibDU-xLeaJw&s" alt="" />
            </div>
            <div className={styles.productDesc}>
              <h5>Hello</h5>
              <ul>
                <li>meow</li>
                <li>meow</li>
                <li>meow</li>
              </ul>
              <div className={styles.buttonContainer}>
                <button>yoyo</button>
                <button>yoyo</button>
              </div>
            </div>
            <div className={styles.productPrice}>
                meow
            </div>
          </div>
          <hr />
        </>
    )
}

;