import { itunesService } from '../../services/itunes.service.js'

export const searchController = {
    getTracks,
    getGenres
}

async function getTracks(req, res) {
    const { query } = req.params
    let { by, sort } = req.query
    sort = sort === 'recent' ? 'recent' : 'popular'
    try {
        let tracks
        switch (by) {
            case 'genre':
                tracks = await itunesService.getTracksByGenre(query, sort)
                break
            case 'artist':
                tracks = await itunesService.getTracksByArtist(query, sort)
                break
            case 'query':
            default:
                tracks = await itunesService.getTracksByQuery(query, sort)
                break
        }
        res.json(tracks)
    } catch (e) {
        res.status(500).send(e.message)
    }
}


async function getGenres(req, res) {
    const { offset, limit } = req.query
    const genres = itunesService.getGenres(offset, limit)
    res.json(genres)
}
