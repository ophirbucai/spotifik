import dummyTracksData from '../data/dummyTracks.json'

export const searchService = {
    getTracksBySearchTerm: (searchTerm) => {
        try {
            const tracks = dummyTracks.filter(({ name, artist }) => `${name}${artist.name}`.match(new RegExp(searchTerm, 'gi')))
            if (!tracks) return searchService._onError('No track results found for ' + searchTerm + '.')
            return { tracks, status: 'success', error: null }
        } catch (e) {
            console.log(e)
            return searchService._onError('Something went wrong! Please try again in a few moments.')
        }
    },
    getEntityById: (type, id) => {
        if (searchService._isInvalidType(type)) {
            return searchService._onError('Could not complete request, type is not supported.')
        }
        if (!id?.trim()) {
            return searchService._onError('Could not complete request, missing ID in hook.')
        }
        try {
            let result
            switch (type) {
                case 'track':
                    result = dummyTracks.find(({ _id }) => _id === id)
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

const dummyArtists = [
    {
        _id: 'adele',
        name: 'Adele'
    },
    {
        _id: 'chet_faker',
        name: 'Chet Faker'
    }
]

<<<<<<< HEAD
const dummyTracks = dummyTracksData

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
    _id: name
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase(), name
}))
=======
const dummyTracks = [
    {
        _id: 'skyfall',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Skyfall_cover.png/220px-Skyfall_cover.png',
        trackName: 'Skyfall',
        youtubeId: 'DeumyOzKqgI',
        artist: dummyArtists[0],
        trackLength: 60 * 4 + 46,
        explicit: false,
        dateAt:'1 week ago',
        genre: 'pop'
    },
    {
        _id: 'rolling_in_the_deep',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png',
        trackName: 'Rolling in the Deep',
        youtubeId: 'bDtjO-R0QSo',
        artist: dummyArtists[0],
        trackLength: 60 * 3 + 48,
        explicit: true,
        dateAt:'5 days ago',
        genre: 'pop'
    },
    {
        _id: 'talk_is_cheap',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/7/73/Talk_Is_Cheap_%28Chet_Faker%29.jpg',
        trackName: 'Talk is Cheap',
        youtubeId: 'aP_-P_BS6KY',
        artist: dummyArtists[1],
        trackLength: 60 * 3 + 39,
        explicit: false,
        dateAt:'3 days ago',
        genre: 'funk'
    }
]
>>>>>>> 13-playlist-table


const dummyPlaylists = [
    {
        _id: '1',
        name: 'Adelush Playlist asdsadasdaa',
        genres: [
            dummyGenres[0]._id
        ],
        songs: [
            { youtubeId: dummyTracks[1].youtubeId, _id: dummyTracks[1]._id },
            { youtubeId: dummyTracks[0].youtubeId, _id: dummyTracks[0]._id }
        ],
        author: 'Ophir'
    },
    {
        _id: '2',
        name: 'Happy Moments',
        genres: [
            dummyGenres[0]._id
        ],
        songs: [
            { youtubeId: dummyTracks[0].youtubeId, _id: dummyTracks[0]._id }
        ],
        author: 'Ophir'
    },
    {
        _id: '3',
        name: 'Funky Monks',
        genres: [
            dummyGenres[1]._id,
            dummyGenres[0]._id
        ],
        songs: [
            { youtubeId: dummyTracks[2].youtubeId, _id: dummyTracks[2]._id },
            { youtubeId: dummyTracks[0].youtubeId, _id: dummyTracks[0]._id },
            { youtubeId: dummyTracks[1].youtubeId, _id: dummyTracks[1]._id }
        ],
        author: 'Ophir'
    },
    {
        _id: '4',
        name: 'Ambient 1970s',
        description: 'Music from the early days of Ambient',
        genres: [
            dummyGenres[2]._id
        ],
        songs: [
            { youtubeId: dummyTracks[1].youtubeId, _id: dummyTracks[1]._id },
            { youtubeId: dummyTracks[0].youtubeId, _id: dummyTracks[0]._id }
        ],
        author: 'Ophir'
    }
]

