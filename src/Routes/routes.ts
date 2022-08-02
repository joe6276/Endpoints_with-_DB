import{ Router} from 'express'
import {  deleteProduct, getProduct, getProducts, insertProduct, updateProduct } from '../Controllers/ProductController'

const router =Router()

router.get('/', getProducts)
router.get('/:id',getProduct)
router.post('/', insertProduct)
router.put('/update/:id',updateProduct)
router.delete('/:id', deleteProduct)


export default router