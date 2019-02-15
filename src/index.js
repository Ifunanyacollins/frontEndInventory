import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from  './Components/App';
import Loader from './Components/Loader'
import {SetProduct} from './Actions/Product'
import congfigureStore from './Store/configureStore'
import * as serviceWorker from './serviceWorker';


const store = congfigureStore()

const jsx = (
    <Provider store={store}>
    <App />
    </Provider>
)
store.dispatch(SetProduct()).then(()=>ReactDOM.render(jsx, document.getElementById('root')))
ReactDOM.render(<Loader />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();