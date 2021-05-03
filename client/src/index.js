import React from 'react'
import ReactDom from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './App'
import reducers from './reducers'
const store = createStore(reducers,compose(applyMiddleware(thunk)))
ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'))