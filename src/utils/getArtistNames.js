export const getArtistNames = (songs) => {
  const artists = songs.reduce((acc, song) => {
    if (song.artist.artistName && !acc.includes(song.artist.artistName)) {
      acc.push(song.artist.artistName);
    }
    return acc;
  }, []);
  return artists.join(", ");
};