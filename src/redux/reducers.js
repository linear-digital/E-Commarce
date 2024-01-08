import { combineReducers } from 'redux'
import User from './User/reducers';
import Tools from './Tools/reducers';



export default combineReducers({
    User,
    Tools
})