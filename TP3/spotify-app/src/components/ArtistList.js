import React from 'react';
import ArtistItem from './ArtistItem';

function ArtistList({ artists, onArtistClick }) {
  return (
    <ul>
      {artists.map((artist) => (
        <ArtistItem
          key={artist.id}
          artist={artist}
          onClick={() => onArtistClick(artist.id)}
        />
      ))}
    </ul>
  );
}

export default ArtistList;
