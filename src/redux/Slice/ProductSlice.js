import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    productList:[],
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try {
      const response = await axios .get('https://6574830cb2fbb8f6509c4879.mockapi.io/api/product');
      console.log(response)
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  });

  export const deleteProduct = createAsyncThunk('data/deleteProduct', async (id) => {
    try {
      const response = await axios .delete(`https://6574830cb2fbb8f6509c4879.mockapi.io/api/product/${id}`);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  });

  export const createProduct = createAsyncThunk('data/createProduct',async (value)=>{
    try{
      let{name,image,price,status} = value;
      const response = await axios .post(`https://6574830cb2fbb8f6509c4879.mockapi.io/api/product`,{name,image,price,status});
      return response
    }
    catch(error){
      throw Error(error.message)
    }
  });

  export const updateProduct = createAsyncThunk('data/updateProduct',async (value)=>{
    try{
      let{id,name,image,price,status} = value;
      const response = await axios .put(`https://6574830cb2fbb8f6509c4879.mockapi.io/api/product/${id}`,{name,image,price,status});
      return response
    }
    catch(error){
      throw Error(error.message)
    }
  })

export const productSlice = createSlice({
    name:"product",
    initialState,  
    reducers:{},
    extraReducers:(builder)=>{
        builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.productList=action.payload
      })
    }
})








