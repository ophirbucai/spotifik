import { google } from 'googleapis'

export const youtubeService = {
    searchTracks
}
const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyCmUVMXTAptzORStHfS5s544rkc_GNUgRI',
})
async function searchTracks({ artistName, trackName, primaryGenreName, ...track }) {
    const query = `${artistName} ${trackName}`
    const { data } = await youtube.videos.list({
        part: 'snippet',
        type: 'video',
        videoCategoryId: 10,
        maxResults: 1,
        q: query,
        chart: 'mostPopular'
    })
    console.log(data)
    if (data.items.length === 1) {
        
        return {
            _id: data.items[0].id,
            trackName: trackName,
            youtubeId: data.items[0].id,
            artistName: artistName,
            primaryGenre: primaryGenreName,
            durationMs: track.trackTimeMillis,
            releaseDate: track.releaseDate,
            albumName: track.collectionName,
            artistId: track.artistId,
            trackId: track.trackId,
            collectionId: track.collectionId,
            previewUrl: track.previewUrl,
            artworkUrl30: track.artworkUrl30,
            artworkUrl70: track.artworkUrl70,
            artworkUrl100: track.artworkUrl100
        }
        //data.items[0].id.videoId
    }
}


