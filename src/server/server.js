import express from 'express'
import { searchRouter } from './api/search/search.routes.js'
import dotenv from 'dotenv'
import { google } from 'googleapis'

dotenv.config()
export const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
})

const port = 5000

// const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
// const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/search', searchRouter)

// app.get('/auth/login', (req, res) => {
// TODO: Implement Spotify OAuth login handler
// })

// app.get('/auth/callback', (req, res) => {
// TODO: Implement Spotify OAuth callback handler
// })

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
