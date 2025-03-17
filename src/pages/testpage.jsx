import Summary from "../components/Summary"
import ItemCart from "../components/ItemCart"
import styles from "./testpage.module.css"

const testpage = () => {
    return(
        <>
            <div className={styles.mainContainer}>
                <div className={styles.itemSection}>
                    <div className={styles.headerContainer}>
                        <h3>My Shopping Bag</h3>
                        <div className={styles.headerDescription}>
                            <h4>Product</h4>
                            <h4>Price</h4>
                        </div>
                    </div>
                    <div className={styles.itemListContainer}>
                        <ItemCart></ItemCart>
                        <ItemCart></ItemCart>
                        <ItemCart></ItemCart>

                    </div>
                </div>
                <div className={styles.summaryContainer}>
                    <Summary></Summary>
                </div>
            </div>
        </>
    );
  };
  
  export default testpage;
  