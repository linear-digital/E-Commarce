import { combineReducers } from 'redux'
import User from './User/reducers';
import Tools from './Tools/reducers';
import Cart from './Cart/reducers'


export default combineReducers({
    User,
    Tools,
    Cart,
})