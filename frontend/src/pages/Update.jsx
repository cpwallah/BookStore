import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: '',
    cover: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/boooks/${bookId}`, book);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Book</h2>
      
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        value={book.desc}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="cover"
        value={book.cover}
        onChange={handleChange}
        style={styles.input}
      />

      {/* ✅ Image Preview */}
      {book.cover && (
        <img
          src={book.cover}
          alt="Preview"
          style={styles.imagePreview}
          onError={(e) => {
            e.target.src = '';
            e.target.alt = 'Invalid Image URL';
          }}
        />
      )}

      <button onClick={handleClick} style={styles.button}>
        Update
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 320,
    margin: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  imagePreview: {
    width: '100%',
    maxHeight: 200,
    objectFit: 'contain',
    borderRadius: 6,
    border: '1px solid #ddd',
  },
};

export default Update;
