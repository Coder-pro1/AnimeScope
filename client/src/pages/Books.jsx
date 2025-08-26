import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Books.css';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);   

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/books");
      setBooks(res.data);
      setFilteredBooks(res.data); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      fetchAllBooks();
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setFilteredBooks(books);
      setSuggestions([]);
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      (book.description && book.description.toLowerCase().includes(query))
    );
    setFilteredBooks(filtered);

   
    const found = books.find(b => b.title.toLowerCase() === query);
    if (found) {
      const similar = books.filter(
        b => b.id !== found.id && 
        (b.description?.toLowerCase().includes("adventure") && found.description?.toLowerCase().includes("adventure"))
      );
      setSuggestions(similar);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="content">
      <h1>Anime Manga Review</h1>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by title or keyword..." 
          value={searchQuery} 
          onChange={handleSearch} 
        />
      </div>


      <div className="nav-buttons">
        <button onClick={() => navigate("/add")} className="add-btn">Add New Book</button>
        <button onClick={() => navigate("/leaderboard")} className="leaderboard-btn">View Leaderboard</button>
      </div>

      
      
      
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>Because you searched for "{searchQuery}", you may also like:</h3>
          <ul>
            {suggestions.map(s => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      )}

     
      <div className='books'>
        {filteredBooks.map(book => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span className="price">${book.price}</span>

            <div className="book-actions">
              <button className="view-btn" onClick={() => navigate(`/book/${book.id}`)}>View & Review</button>
              <button className="update" onClick={() => navigate(`/update/${book.id}`)}>Update</button>
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
