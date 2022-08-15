import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../Config/Config'
import Connection from '../DatabaseHelpers/db'
const db = new Connection()

interface ExtendedRequest extends Request {
  body: {
    product: string
    description: string
  }
}
export const insertProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid()
    const { product, description } = req.body
    db.exec('insertProducts',{id,product,description})
    res.json({ message: 'Product Inserted Successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const {recordset} =await db.exec('getProducts')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}

export const getProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('getProduct',{id})
    if (!recordset[0]) {
      res.json({ message: 'Product Not Found' })
    } else {
      res.json(recordset)
    }
  } catch (error) {
    res.json({ error })
  }
}

export const updateProduct: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const id= req.params.id
    const { product, description } = req.body as {
      product: string
      description: string
    }
       const {recordset} =await db.exec('getProduct',{id})
      if(!recordset[0]){
         res.json({ message: 'Product Not Found' })
      }else{
         await  db.exec('updateProduct',{id,product,description})
          res.json({message:'Product Updated ...'})
      }
 

  } catch (error:any) {
      res.json({ error })
  }
}



export const deleteProduct:RequestHandler<{id:string}> =async(req,res)=>{
    try {
        const id = req.params.id
        const {recordset} =await db.exec('getProduct',{id})
        if(!recordset[0]){
         res.json({ message: 'Product Not Found' })
        }else{
          // Procedure Way
        //   await db.exec('deleteProduct', {id})
        // res.json({message:'Product Deleted'})

        // Query Way
        await db.query(`DELETE FROM Products WHERE id='${id}'`)
        res.json({message:'Product Deleted'})
      }
    } catch (error:any) {
       res.json({ error }) 
    }
}
