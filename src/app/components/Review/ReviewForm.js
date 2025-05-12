import styles from './ReviewForm.module.css';

const ReviewForm = ({newReview, handleNewReviewNameChange, handleSendNewReview}) => {
    return (
        <form className={styles.reviewForm} onSubmit={handleSendNewReview}>
            <input
                type="text"
                name="reviewerName"
                placeholder="Your Name"
                className={styles.input}
                value={newReview.reviewerName}
                onChange={handleNewReviewNameChange}
                required
            />

            <textarea
                name="content"
                placeholder="Write your review here..."
                className={styles.textarea}
                value={newReview.content}
                onChange={handleNewReviewNameChange}
                required
            />

            <button
                type="submit"
                className={styles.button}
            >
                Send Review
            </button>
        </form>
    );
}

export default ReviewForm;