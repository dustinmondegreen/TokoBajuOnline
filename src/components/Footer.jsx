import styles from './Footer.module.css'

function Footer(){
    
    return(
        <>
        <footer>
            <div className ={styles.footerContainer}>
                <div className={styles.footerCompany}>
                <h3>Company</h3>
                <hr />
                    <ul>
                        <li>About Us</li>
                        <li>Our Services</li>
                        <li>Privacy Policy</li>
                        <li>Affiliate Program</li>
                    </ul>
                </div>
    
                <div className={styles.footerHelp}>
                <h3>Get Help</h3>
                <hr />
                    <ul>
                        <li>FAQ</li>
                        <li>Shipping</li>
                        <li>Returns</li>
                        <li>Order Status</li>
                        <li>Payment Option</li>
                    </ul>
                </div>
    
                <div className={styles.footerShop}>
                <h3>Online Shop</h3>
                <hr />
                    <ul>
                        <li>Watch</li>
                        <li>Bag</li>
                        <li>Shoes</li>
                        <li>Dress</li>
                    </ul>
                </div>
    
                <div className={styles.footerFollow}>
                <h3>Follow Us!</h3>
                <hr />
                    <ul className='followRow'>
                        <li>meow</li>
                        <li>meow</li>
                    </ul>
                </div>         
            </div>
        </footer>
        </>
    )
}

export default Footer;