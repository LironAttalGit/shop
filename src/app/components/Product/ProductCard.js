import styles from './ProductCard.module.css'
import Link from 'next/link';

const ProductCard = ({ id, image, name, price, onClick }) => {
    return (
        <div className={styles.card}>
            <Link
                href={`/products/${id}`}
                passHref >
                <img src={image} alt={name} className={styles.image} />
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.price}>${price.toFixed(2)}</p>
            </Link>

            <button className={styles.button} onClick={onClick}>
                Add
            </button>
        </div>
    );
}

export default ProductCard;