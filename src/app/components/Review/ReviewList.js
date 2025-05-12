import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';

const ReviewList = ({ reviews, reviewsContainerRef }) => {
    return (
        <div className={styles.reviewList} ref={reviewsContainerRef}>
            {
                reviews.map((review) => {
                    return (
                        <ReviewCard
                            key={review._id}
                            reviewerName={review.reviewerName}
                            content={review.content}
                        />
                    )
                })
            }
        </div>
    );
}

export default ReviewList;