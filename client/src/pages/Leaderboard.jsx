import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Books.css'

function Leaderboard() {
  const navigate = useNavigate();
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:8800/leaderboard');
        setTopBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  const getMedalIcon = (position) => {
    switch(position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <button onClick={() => navigate('/books')} className="back-btn">← Back to Books</button>
        <h1>Book Leaderboard</h1>
        <p className="subtitle">Top-rated books based on user reviews</p>
      </div>

      {topBooks.length > 0 ? (
        <div className="leaderboard-list">
          {topBooks.map((book, index) => (
            <div 
              key={book.id} 
              className={`leaderboard-item rank-${index + 1} ${index < 3 ? 'podium' : ''}`}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="rank">
                {typeof getMedalIcon(index + 1) === 'string' && getMedalIcon(index + 1).includes('#') ? (
                  <span className="rank-number">{getMedalIcon(index + 1)}</span>
                ) : (
                  <span className="medal">{getMedalIcon(index + 1)}</span>
                )}
              </div>
              
              <div className="book-image">
                {book.cover ? (
                  <img src={book.cover} alt={book.title} />
                ) : (
                  <div className="no-image">📚</div>
                )}
              </div>
              
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <div className="rating-info">
                  <div className="stars">
                    {renderStars(book.average_rating)}
                  </div>
                  <div className="rating-stats">
                    <span className="average-rating">{book.display_rating}/5.0</span>
                    <span className="review-count">({book.review_count} review{book.review_count !== 1 ? 's' : ''})</span>
                  </div>
                </div>
              </div>
              
              <div className="score-display">
                <div className="score-circle">
                  <span className="score">{book.display_rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-reviews-message">
          <h2>No rated books yet!</h2>
          <p>Books will appear here once they receive reviews.</p>
          <button onClick={() => navigate('/books')} className="browse-books-btn">
            Browse Books
          </button>
        </div>
      )}

      <div className="leaderboard-footer">
        <p>Rankings are based on average user ratings and review counts.</p>
      </div>
    </div>
  );
}

export default Leaderboard;