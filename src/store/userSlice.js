import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    firstname: '',
    lastname:'',
    email:'',
    id:'',
    pfp:'',
    weighttracker:[],
    calorietracker:[],
};


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setfirstname:(state,action)=>{
            state.firstname = action.payload.firstname
        },

        setlastname:(state,action)=>{
            state.lastname = action.payload.lastname
        },

        setemail:(state,action)=>{
            state.email = action.payload.email
        },

        setid:(state,action)=>{
            state.id = action.payload.id
        },

        setpfp:(state,action)=>{
            state.pfp = action.payload.pfp
        },  

        setweight:(state,action)=>{
            state.weighttracker = action.payload.weighttracker
        }, 

        setcalorie:(state,action)=>{
            state.calorietracker = action.payload.calorietracker
        }, 

        addweight:(state,action)=>{
            state.weighttracker = [...state.weighttracker, action.payload.weighttracker]
           
        },
        sortweight:(state,action)=>{
              state.weighttracker.sort(function(a,b){
                return new Date(a.date)- new Date(b.date);
              })
        },

        sortcalorie:(state,action)=>{
            state.calorietracker.sort(function(a,b){
              return new Date(a.date)- new Date(b.date);
            })
      },
        addcalorie:(state,action)=>{
            state.calorietracker = [...state.calorietracker, action.payload.calorietracker]
        },

        deleteweight:(state,action)=>{
            state.weighttracker = state.weighttracker.filter((item,index)=>{
                return index.toString() !== action.payload.index
            })
        },

        deletecalorie:(state,action)=>{
            state.calorietracker = state.calorietracker.filter((item,index)=>{
                return index.toString() !== action.payload.index
            })
        },

        clearuser:(state)=> {
           void( state.firstname = '',
            state.lastname = '',
            state.email='',
            state.weighttracker = [],
            state.calorietracker = [] )
        }
    }

});


export const {deletecalorie, sortcalorie, sortweight, deleteweight,clearuser, addcalorie, addweight , setemail , setlastname , setfirstname, setid, setpfp, setcalorie, setweight } = userSlice.actions;
export default userSlice.reducer;