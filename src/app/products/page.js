'use client';

import styles from './page.module.css'
import ProductList from '../components/Product/ProductList';
import { useSetAtom } from 'jotai';
import { cartAtom } from '../store/CartAtom';
import { useState, useEffect } from 'react';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products');

                if(!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
     }
    , []);


    const setCartItems = useSetAtom(cartAtom);

    const handleAddToCart = (product) => {
        setCartItems(
            (prevItems) => {
                return [...prevItems, { ...product }]
            }
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product List</h1>

            {
                loading && <p>Loading...</p>
            }

            {
                error && <p>{error}</p>
            }

            <ProductList
                products={products}
                onProductAddClicked={handleAddToCart}
            />
        </div>
    );
};