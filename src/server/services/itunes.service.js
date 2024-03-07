import axios from 'axios'
import { itunesGenres } from './itunes/itunesGenres.js'

export const itunesService = {
    getTracksByQuery,
    getTracksByGenre,
    getTracksByArtist,
    getGenres
}

const client = axios.create({
    baseURL: 'https://itunes.apple.com'
})
const defaultParams = {
    mediaType: 'music',
    entity: 'song',
    country: 'US',
    version: 2,
    limit: 25
}
async function getTracksByQuery(query, sort) {
    const { data } = await client.get('/search', {
        params: {
            term: query,
            attribute: 'songTerm',
            sort,
            ...defaultParams
        }
    })
    return data.results
}

async function getTracksByGenre(query, sort) {
    const genre = itunesGenres.get(query)
    const genreName = genre[0]
    const genreId = genre.at(-1)
    if (!genre) {
        throw new Error('Genre not found')
    }
    const { data } = await client.get('/search', {
        params: {
            term: genreName,
            genreId,
            sort,
            ...defaultParams,
            limit: 50
        }
    })
    return data.results.filter(({ primaryGenreName }) => primaryGenreName === genreName)
}

async function getTracksByArtist(artist, sort) {
    const { data } = await client.get('/search', {
        params: {
            term: artist,
            attribute: 'artistTerm',
            sort,
            ...defaultParams
        }
    })
    return data.results
}

const genres = itunesGenres.entries()
async function getGenres(offest = 0, limit = 25) {
    return genres.slice(offest, offest + limit)
}
