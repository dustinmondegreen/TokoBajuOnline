import Summary from "../components/Summary"
import ItemCart from "../components/ItemCart"
import styles from "./testpage.module.css"

const testpage = () => {
    return(
        <>
        <div className={styles.parentContainer}>
            <div className={styles.cart}>
                <hr />
                <ItemCart></ItemCart>
                <hr />
                <ItemCart></ItemCart>
                <hr />
            </div>
            <div className={styles.summary}>
                <Summary></Summary>
            </div>
        </div>=
        </>
    );
  };
  
  export default testpage;
  