import dummyTracksData from '../server/data/dummyTracks.json'
import { toKebabCase } from '../utils/toKebabCase.js'
import axios from 'axios'

export const searchService = {
    searchAll: (searchTerm) => {
        try {
            const tracks = dummyTracks.filter(({
                trackName,
                artistName
            }) => `${trackName}${artistName}`.match(new RegExp(searchTerm, 'gi')))
            const artists = dummyArtists.filter(({ name }) => name.match(new RegExp(searchTerm, 'gi')))
            const playlists = dummyPlaylists.filter(({ name }) => name.match(new RegExp(searchTerm, 'gi')))
            if (!tracks && !artists && !playlists) return searchService._onError('No results found for ' + searchTerm + '.')
            return searchService._onSuccess({ tracks, artists, playlists })
        } catch (e) {
            console.log(e)
            return searchService._onError('Something went wrong! Please try again in a few moments.')
        }
    },
    getTracksBySearchTerm: (searchTerm) => {
        try {
            const tracks = dummyTracks.filter(({
                trackName,
                artistName
            }) => `${trackName}${artistName}`.match(new RegExp(searchTerm, 'gi')))
            if (!tracks) return searchService._onError('No track results found for ' + searchTerm + '.')
            console.log(tracks)
            return searchService._onSuccess(tracks)
        } catch (e) {
            console.log(e)
            return searchService._onError('Something went wrong! Please try again in a few moments.')
        }
    },
    getEntityById: async (type, id) => {
        if (searchService._isInvalidType(type)) {
            return searchService._onError('Could not complete request, type is not supported.')
        }
        if (!id) {
            return searchService._onError('Could not complete request, missing ID in hook.')
        }
        try {
            let result
            switch (type) {
                case 'track':
                    var resultIndex = dummyTracks.findIndex(({ _id }) => _id === id)
                    result = dummyTracks[resultIndex]
                    if (!result.youtubeId) {
                        result.youtubeId = await getYoutubeId(result)
                        if (!result.youtubeId) throw 'No youtubeId found'
                        dummyTracks[resultIndex] = result
                    }
                    break
                case 'artist':
                    result = dummyArtists.find(({ _id }) => _id === id)
                    break
                case 'playlist':
                    result = dummyPlaylists.find(({ _id }) => _id === id)
                    break
                case 'album':
                    throw 'Not implemented yet'
            }
            if (!result) throw `No ${type} found`
            return searchService._onSuccess(result)

        } catch (err) {
            return searchService._onError(err)
        }
    },
    getGenres: () => {
        try {
            return dummyGenres
        } catch (e) {
            console.log(e)
        }
    },
    getGenreById: (id) => {
        try {
            return dummyGenres.find(({ _id }) => _id === id)
        } catch (e) {
            console.log(e)
        }
    },
    getPlaylists: () => {
        try {
            return dummyPlaylists
        } catch (e) {
            console.log(e)
        }
    },
    // getStationsByGenre: (genre) => {
    //     // TODO: Request the server by tag and receive a list of playlists that contain that tag.
    //     try {
    //         return dummyPlaylists.filter(({ genres }) => genres.includes(genre))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    getPlaylistsByGenre: (genre) => {
        try {
            const playlists = dummyPlaylists.filter(({ genres }) => genres.includes(genre))
            if (!playlists) return searchService._onError('No playlists found for ' + genre + '.')
            return { playlists, status: 'success', error: null }
        } catch (e) {
            console.log(e)
            return searchService._onError('Something went wrong! Please try again in a few moments.')
        }
    },
    createPlaylist: () => {
        const _id = String(dummyPlaylists.length + 1)
        dummyPlaylists.unshift({
            _id,
            name: `My Playlist #${_id}`,
            genres: [],
            songs: [],
            author: 'Ophir'
        })
        return searchService._onSuccess(dummyPlaylists)
    },
    _isInvalidType: (type) => !['track', 'album', 'artist', 'playlist']
        .includes(type),
    _onError:
        (msg) => ({
            status: 'error',
            data: null,
            error: msg
        }),
    _onSuccess:
        (data) => ({
            status: 'success',
            data,
            error: null
        })
}

const genres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Electronic',
    'Blues',
    'Country',
    'Reggae',
    'Folk',
    'Metal',
    'Punk',
    'Indie',
    'Soul',
    'Funk',
    'Techno',
    'House',
    'Dubstep',
    'Disco']

export const dummyGenres = genres.map((name) => ({
    _id: toKebabCase(name),
    name
}))

const getYoutubeId = async ({ trackName, artistName, trackId } = {}) => {
    try {
        const { data } = await axios.get('/api/search/youtube', {
            params: {
                query: `${artistName} ${trackName}`,
                trackId
            }
        })
        return data?.youtubeId

    } catch (err) {
        console.log(err)
    }
}

const dummyTracks = dummyTracksData

const dummyArtists = dummyTracksData.reduce((acc, { artistName }) => {
    if (acc.find(({ name }) => name === artistName)) return acc
    return [...acc, { _id: toKebabCase(artistName), name: artistName }]
}, [])

const processSongs = async (songs) => {
    const genreMap = songs.reduce((acc, song) => {
        if (acc[song.genre]) {
            acc[song.genre].songs.push(song)
            acc[song.genre].genres = [...new Set(acc[song.genre].genres, song.primaryGenre)]
        } else {
            acc[song.genre] = {
                _id: song.genre,
                name: 'Best of ' + song.genre[0].toUpperCase() + song.genre.slice(1, song.genre.length),
                author: 'Ophir', // TODO: Replace with real author
                genres: [toKebabCase(song.genre)],
                songs: [song]
            }
        }
        return acc
    }, {})

    return await Promise.all(Object.values(genreMap).map(async (playlist) => {
        if (playlist.songs.length) {
            playlist.songs[0].youtubeId = await getYoutubeId(playlist.songs[0])
        }
        return playlist
    }))
}

const dummyPlaylists = (async () => await processSongs(dummyTracksData))()
