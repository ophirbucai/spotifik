import KeyValuePairService from './keyvaluepair.service.js'
import { youtube } from '../server.js'

export const youtubeService = {
    searchTracks
}
const PATH = '../data/youtubeIds.json'

async function searchTracks(query, trackId) {
    // const query = `${artistName} ${trackName}`
    const service = new KeyValuePairService(PATH)
    const savedYoutubeId = service.get(trackId)
    if (savedYoutubeId) {
        return { youtubeId: savedYoutubeId }
    }
    // return { youtubeId: 'narFtb5tdTQ' }
    const { data } = await youtube.search.list({
        part: 'snippet',
        type: 'video',
        videoCategoryId: 10,
        maxResults: 1,
        q: query
    })
    service.save(trackId, data.items[0].id.videoId)
    return { youtubeId: data.items[0].id.videoId }
    // if (data.items.length === 1) {
    //     return {
    //         _id: trackId,
    // trackName: trackName,
    // youtubeId: data.items[0].id.videoId,
    // artistName: artistName,
    // primaryGenre: primaryGenreName,
    // durationMs: track.trackTimeMillis,
    // releaseDate: track.releaseDate,
    // albumName: track.collectionName,
    // artistId: track.artistId,
    // trackId: trackId,
    // collectionId: track.collectionId,
    // previewUrl: track.previewUrl,
    // artworkUrl30: track.artworkUrl30,
    // artworkUrl70: track.artworkUrl70,
    // artworkUrl100: track.artworkUrl100
    // }
    // }
}


