import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../Config/Config'

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
    const pool = await mssql.connect(sqlConfig)
    await pool
      .request()
      .input('id', mssql.VarChar, id)
      .input('product', mssql.VarChar, product)
      .input('description', mssql.VarChar, description)
      .execute('insertProducts')

    res.json({ message: 'Product Inserted Successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const products = await pool.request().execute('getProducts')
    const { recordset } = products
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}

export const getProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const pool = await mssql.connect(sqlConfig)
    const products = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('getProduct')
    const { recordset } = products
    if (!products.recordset[0]) {
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
    const id =req.params.id
    const pool = await mssql.connect(sqlConfig)
    const { product, description } = req.body as {
      product: string
      description: string
    }
      const products = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('getProduct')
      if(!products.recordset[0]){
         res.json({ message: 'Product Not Found' })
      }else{

        await pool.request()
          .input('id', mssql.VarChar, id)
          .input('product', mssql.VarChar, product)
          .input('description', mssql.VarChar, description)
          .execute('updateProduct')
          res.json({message:'Product Updated ...'})
      }
 

  } catch (error:any) {
      res.json({ error })
  }
}



export const deleteProduct:RequestHandler<{id:string}> =async(req,res)=>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
      
        const products = await pool
      .request()
      .input('id', mssql.VarChar, id)
      .execute('getProduct')
      if(!products.recordset[0]){
         res.json({ message: 'Product Not Found' })
      }else{
          // await pool.request().query(`DELETE FROM Products WHERE id='${id}'`)
        await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('deleteProduct')
        res.json({message:'Product Deleted'})
      }
    } catch (error:any) {
       res.json({ error }) 
    }
}
