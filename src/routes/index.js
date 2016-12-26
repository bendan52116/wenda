import express form 'express'

const router=express.Router()

router.get('/',(req,res)=>{
res.render('index.html')
})

export default router