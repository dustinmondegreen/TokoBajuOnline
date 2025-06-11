import styles from './Footer.module.css'

function Footer(){
    
    return(
        <>
        <footer>
        <div className={styles.parentContainer}>
            {/* Header Section */}
            <div className={styles.headContainer}>
                <div className={styles.logoContainer}>
                <img src="/Vector.png" alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.listContainer}>
                <ul>
                    <h3>Products</h3>
                    <li>Catalog</li>
                </ul>
                <ul>
                    <h3>Company</h3>
                    <li>Career</li>
                </ul>
                <ul>
                    <h3>Contact</h3>
                    <li>WhatsApp</li>
                    <li>Email</li>
                    <li>LINE</li>
                </ul>
                </div>
            </div>
            
            {/* Support Section */}
            <div className={styles.supportContainer}>
                <h3>Support Us</h3>
                <div className={styles.iconContainer}>
                <img src="/Group.png" alt="Support Icon" className={styles.icon} />
                <img src="/Vector(3).png" alt="Support Icon" className={styles.icon} />
                <img src="/Vector(4).png" alt="Support Icon" className={styles.icon} />
                <img src="/Vector(5).png" alt="Support Icon" className={styles.icon} />
                <img src="/Vector(6).png" alt="Support Icon" className={styles.icon} />
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className={styles.bottomContainer}>
                <p>All Rights Reserved GDGH 2025 © Gak DATA Gak HIDUP</p>
                <p>Privacy Policy & Terms of Service</p>
            </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;