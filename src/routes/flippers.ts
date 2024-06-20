import { Hono } from 'hono'
import {Flipper} from '../models/flippers'
import { isValidObjectId } from 'mongoose'

const api = new Hono().basePath('/flippers')

api.get('/', async (c)=>{
    // find mongoose attend trois object param 
    // query 
    // projection
    // options
    const allFlippers = await Flipper.find(
        {}, // query
    )

    return c.json(allFlippers)
})

api.get('/:flipperId', async (c)=>{
    const _id = c.req.param('flipperId')

    if(isValidObjectId(_id)){
        const oneCrea = await Flipper.findOne(
            {_id}
        )
        return c.json(oneCrea)
    }
    return c.json({msg:'ObjectId malformed'},400)
})


api.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const newFlipper = new Flipper(body);
    const saveFlipper = await newFlipper.save();
    return c.json(saveFlipper, 201);
  } catch (error: any) {
    return c.json(error, 400);
  }
});




// en put, on écrase toutes les valeurs (y compris les tableaux)
api.put('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const body = await c.req.json()

    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }

    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})
// en patch, on va "append" les éléments passés dans le body
api.patch('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const body = await c.req.json()

    const q = {
        _id
    }
    const {brand,...rest} = body

    const updateQuery = {
        $addToSet:{
            brand:brand
        },
        $set:{...rest}
    }
    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const tryToDelete = await Flipper.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api