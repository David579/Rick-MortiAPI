import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
        </button>
        <span> Page {page} </span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <div className="character-container">
        {characters.map((character) => (
          <div key={character.id} className="character-box">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
