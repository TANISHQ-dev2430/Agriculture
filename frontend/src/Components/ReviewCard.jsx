
const ReviewCard = ({ image, name, star, paragraph }) => {
    return (
      <div className="reviewCard">
        <img src={image} alt={name} className="review-img"/>
        <h3 id="reviewer-name">{name}</h3>
        <p id="review-stars">{"⭐".repeat(star)}</p>
        <p id="review-des">{paragraph}</p>
      </div>
    );
  };

  export default ReviewCard;