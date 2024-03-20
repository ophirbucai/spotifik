import { Router } from 'express'
import { searchController } from './search.controller.js'

const router = Router()

router.get('/genres', searchController.getGenres)
router.get('/youtube',searchController.getTracksFromYoutube)
router.get('/:query', searchController.getTracks)


export { router as searchRouter }
