import {createStore , combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import proudctReducer from '../Reducers/ProductRed'
import FiltersRed from '../Reducers/FiltersRed'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {

    const store = createStore(
        combineReducers({
            products:proudctReducer,
            filters:FiltersRed
 
        }),
       composeEnhancers(applyMiddleware(thunk))
    )

    return store

} 


