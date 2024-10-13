import React from 'react';

function AlbumItem({ album }) {
  return (
    <li>
      <img src={album.images[0]?.url} alt={album.name} width="50" />
      <p>{album.name} ({new Date(album.release_date).getFullYear()})</p>
    </li>
  );
}

export default AlbumItem;
