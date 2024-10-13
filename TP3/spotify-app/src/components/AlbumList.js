import React from 'react';
import AlbumItem from './AlbumItem';

function AlbumList({ albums }) {
  return (
    <ul>
      {albums.map((album) => (
        <AlbumItem key={album.id} album={album} />
      ))}
    </ul>
  );
}

export default AlbumList;
