import Link from 'next/link';
import styles from './Navbar.module.css';


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/cart" className={styles.link}>My Cart</Link>
            </div>
            <div className={styles.right}>
                <Link href="/products" className={styles.link}>Products</Link>
                <Link href="/reviews" className={styles.link}>Reviews</Link>
            </div>
        </nav>
    );
}