import { createSlice,PayloadAction  } from '@reduxjs/toolkit'




const initialState= {
    show: false,
    Modelshow: false,
  blog: [],
    updateId:"",
    search:"",
    
}

const reduxstate = createSlice({
  name: "second",
  initialState,
    reducers: {
        changeShow: (state,  {payload} : PayloadAction<boolean>) => {
            state.show = payload
        },
        changeModle: (state,  {payload} : PayloadAction<boolean>) => {
            state.Modelshow = payload
        },
        changeid: (state,  {payload} : PayloadAction<string>) => {
            state.updateId = payload
        },
        addsearch: (state,  {payload} : PayloadAction<string>) => {
            state.updateId = payload
        },
        addBlog: (state, { payload } ) => {
      state.blog = payload;
    },

        
  }
});

export const {changeShow, addBlog,changeModle,changeid,addsearch} = reduxstate.actions

export default reduxstate.reducer