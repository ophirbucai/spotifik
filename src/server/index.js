import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const port = 5000

dotenv.config()

// const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
// const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.get('/auth/login', (req, res) => {
// TODO: Implement Spotify OAuth login handler
// })

// app.get('/auth/callback', (req, res) => {
// TODO: Implement Spotify OAuth callback handler
// })

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
