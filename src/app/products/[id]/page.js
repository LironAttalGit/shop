'use client';

import styles from './page.module.css'
import { useSetAtom } from 'jotai';
import { cartAtom } from '../../store/CartAtom';
import { useState, useEffect } from 'react';
import React from 'react';


export default function ProductDetails({ params }) {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = React.use(params);

    useEffect(() => {
        const fetchProduct = async () => {


            try {
                const response = await fetch(`http://localhost:3001/api/products/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await response.json();
                setProduct(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }
        , []);

    const setCartItems = useSetAtom(cartAtom);

    const handleAddToCart = () => {
        setCartItems(
            (prevItems) => {
                return [...prevItems, { ...product }]
            }
        );
    };


    return (
        <main className={styles.container}>

            {
                loading && <p>Loading...</p>
            }

            {
                error && <p>{error}</p>
            }

            {
                !!product.name &&
                <article className={styles.product}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <section className={styles.content}>
                        <div className={styles.descriptionSection}>
                            <p className={styles.description}>{product.description}</p>
                        </div>
                        <div className={styles.imageSection}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.image}
                            />
                        </div>
                    </section>
                    <hr className={styles.divider} />
                    <section className={styles.bottomSection}>
                        <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
                        <button className={styles.button} onClick={handleAddToCart}>Add to Cart</button>
                    </section>
                </article>
            }



        </main>
    )
}