import React from 'react';

function ArtistItem({ artist, onClick }) {
  return (
    <li onClick={onClick}>
      <img src={artist.images[0]?.url} alt={artist.name} width="50" />
      <p>{artist.name}</p>
    </li>
  );
}

export default ArtistItem;
