export const searchService = {
    search: (searchTerm) => {
        try {
            return dummyResults.filter(({ trackName, artistName }) => `${trackName}${artistName}`.includes(searchTerm))
        } catch (e) {
            console.log(e)
        }
    }
}

const dummyResults = [
    {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Skyfall_cover.png/220px-Skyfall_cover.png',
        trackName: 'Skyfall',
        artistName: 'Adele',
        trackLength: 60 * 4 + 46,
        explicit: false
    },
    {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png',
        trackName: 'Rolling in the Deep',
        artistName: 'Adele',
        trackLength: 60 * 3 + 48,
        explicit: true
    }
]
