import React, { useState } from 'react';
import './mp.css';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState([
    'Song A',
    'Song B',
    'Song C',
    'Song D'
  ]);
  const [newSong, setNewSong] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((currentIndex + 1) % playlist.length);
  };

  const goToPrevious = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length);
  };

  const addSong = () => {
    if (newSong.trim() === '') return;
    setPlaylist([...playlist, newSong.trim()]);
    setNewSong('');
  };

  const deleteSong = (index) => {
    const updated = playlist.filter((_, i) => i !== index);

    // Adjust current index
    if (index === currentIndex && updated.length === 0) {
      setCurrentIndex(0);
    } else if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    } else if (index === currentIndex) {
      setCurrentIndex(currentIndex % updated.length);
    }

    setPlaylist(updated);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>🎵 Music Player</h2>

      {/* Add Song */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          placeholder="Enter song title"
          style={{ flex: 1, padding: '6px' }}
        />
        <button onClick={addSong}>Add</button>
      </div>

      {/* Current Song Display */}
      <p>
        <strong>Current Song:</strong>{' '}
        {playlist.length === 0 ? (
          <em>No songs yet</em>
        ) : (
          playlist[currentIndex]
        )}
      </p>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>

      {/* Playlist Display */}
      <ul>
        {playlist.map((song, index) => (
          <li
            key={index}
            style={{
              marginBottom: '8px',
              color: index === currentIndex ? 'blue' : 'black',
              fontWeight: index === currentIndex ? 'bold' : 'normal',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <span onClick={() => setCurrentIndex(index)}>{song}</span>
            <button
              onClick={() => deleteSong(index)}
              style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
              title="Delete Song"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
