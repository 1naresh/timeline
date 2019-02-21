

import { combineReducers } from 'redux';

let userState = { posts:[],firstName:"Naresh",userId:"1" }
const user = (state =userState,action) =>{
    switch(action.type){
        case "EDIT_PRODUCT":{
            return {...state,breadcrumb:"addProduct",product_id:action._id}
        }
        default :{
            return state 
        }
    }
}

const root = combineReducers({
    user
})

export default root

