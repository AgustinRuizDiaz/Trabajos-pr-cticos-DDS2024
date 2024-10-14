import React from 'react';

function ArtistItem({ artist, onClick }) {
  const imageUrl = artist && artist.images && artist.images.length > 0 
    ? artist.images[0].url 
    : 'https://via.placeholder.com/100'; 

  return (
    <li onClick={onClick} className="artist-item">
      <img src={imageUrl} alt={artist ? artist.name : 'Artist'} width="50" />
      <p>{artist ? artist.name : 'Unknown Artist'}</p>
    </li>
  );
}

export default ArtistItem;