import { Router } from 'express'
import { searchController } from './search.controller.js'

const router = Router()

router.get('/:query', searchController.getTracks)
router.get('/genres', searchController.getGenres)


export { router as searchRouter }
