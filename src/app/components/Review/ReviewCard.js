import styles from './ReviewCard.module.css';

const ReviewCard = ({ reviewerName, content }) => {
    return (
        <div className={styles.reviewCard}>
            <h3 className={styles.reviewerName}>{reviewerName}</h3>
            <p className={styles.reviewContent}>{content}</p>
        </div>
    );
}

export default ReviewCard;