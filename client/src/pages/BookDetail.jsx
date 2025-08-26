import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Review.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviewer_name, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [review_text, setReviewText] = useState("");

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleAddReview = async () => {
    try {
      await axios.post(`http://localhost:8800/books/${id}/reviews`, {
        reviewer_name, rating, review_text
      });
      setReviewerName("");
      setRating(0);
      setReviewText("");
      fetchBook(); 
    } catch (err) {
      console.log(err);
    }
  }

  if (!book) return <div>Loading...</div>;

  return (
    <div className="content">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>{book.title}</h2>
      <div className="book-image-container">
        {book.cover && <img src={book.cover} alt={book.title} />}
      </div>

      <p>{book.description}</p>
      <span>${book.price}</span>

      <h3>Reviews</h3>
      <div className="reviews-section">
        {book.reviews.length > 0 ? (
          book.reviews.map(r => (
            <div key={r.id} className="review-item">
              <div className="review-header">
                <span className="reviewer-name">{r.reviewer_name}</span>
                <span className="review-rating">{r.rating} ★</span>
              </div>
              <p className="review-text">{r.review_text}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews-message">No reviews yet</p>
        )}
      </div>

      <h3>Add a Review</h3>
      <div className="review-form-section">
        <div className="review-form">
          <input type="text" placeholder="Your Name" value={reviewer_name} onChange={e => setReviewerName(e.target.value)} />
          <input type="number" placeholder="Rating (1-5)" value={rating} onChange={e => setRating(Number(e.target.value))} />
          <textarea placeholder="Your Review" value={review_text} onChange={e => setReviewText(e.target.value)} />
          <button className="submit-review-btn" onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  )
}

export default BookDetail;
