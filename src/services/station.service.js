export const dummyTags = [{ _id: 'happy', tag: 'Happy', color: 'yellow' }, { _id: 'funk', tag: 'Funk', color: 'green' }]

export const stationService = {
    searchByTag: (tag) => {
        // TODO: Request the server by tag and receive a list of playlists that contain that tag.
        try {
            return dummyStations.filter(({ tags }) => tags.includes(tag))
        } catch (e) {
            console.log(e)
        }
    }
}


export const dummyStations = [
    {
        id: 1,
        name: 'Happy Moments',
        tags: [
            'Happy'
        ]
    },
    {
        id: 2,
        name: 'Funky Monks',
        tags: [
            'Funk',
            'Happy'
        ]
    }
]
