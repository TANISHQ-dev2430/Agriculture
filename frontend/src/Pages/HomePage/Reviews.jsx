import ReviewCard from "./ReviewCard.jsx";  // Fix the import
import { reviews } from "../../Review-data.js";

export default function Reviews() {
  return (
    <div className="review-section">
      <h2>Top Customer Reviews</h2>
      <section id="feedback">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}  // Added key to avoid React warning
            image={review.image}
            name={review.name}
            star={review.star}
            paragraph={review.paragraph}
          />
        ))}
      </section>
    </div>
  );
}
