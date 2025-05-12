'use client'

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import ReviewList from '../components/Review/ReviewList';
import ReviewForm from '../components/Review/ReviewForm';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [newReview, setNewReview] = useState({
        reviewerName: '',
        content: '',
    });

    const reviewsContainerRef = useRef(null);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/reviews?page=${page}&limit=5`);

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                setReviews((prevReviews) => [...prevReviews, ...data]);


                if (data.length === 0) {
                    setFetching(false);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }
        , [page]);


    useEffect(() => {
        const container = reviewsContainerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };

    }, [loading, fetching]);

    const handleScroll = () => {
        if (reviewsContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = reviewsContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5 && !fetching && !loading) {
                setPage((prevPage) => prevPage + 1); // Fetch the next page
            }
        }
    };

    const handleNewReviewNameChange = (event) => {
        const { name, value } = event.target;

        setNewReview(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    const handleSendNewReview = async (event) => {
        event.preventDefault();

        if (newReview.reviewerName && newReview.content) {
            try {
                const response = await fetch('http://localhost:3001/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReview),
                });

                if (!response.ok) {
                    throw new Error('Failed to send review');
                }

                setReviews(prevReviews => {
                    return [...prevReviews, { ...newReview }]
                });

                setNewReview(
                    {
                        reviewerName: '',
                        content: '',
                    }
                );
            } catch (e) {
                alert('Failed to send review,please try again later');
            }
        }
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product Reviews</h1>

            {
                loading && <p>Loading...</p>
            }

            {
                error && <p>{error}</p>
            }

            <ReviewList
                key={reviews.keys}
                reviews={reviews}
                reviewsContainerRef={reviewsContainerRef}
            />
            <ReviewForm
                newReview={newReview}
                handleNewReviewNameChange={handleNewReviewNameChange}
                handleSendNewReview={handleSendNewReview}
            />
        </div>
    );
}

export default Reviews;