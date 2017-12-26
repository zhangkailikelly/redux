//Provider继承reactComponent
import React from 'react'
//渲染
import {render} from 'react-dom'
//createStore创建store
import {createStore} from 'redux'
//容器组件
import {Provider} from 'react-redux'
//容器组件
import App from './containers/App'
//将子reduce合并成一个主reduce传进createStore()内,当调用dispatch时会自动调用reduce内对应的方法
import todoApp from './reducers'

let store=createStore(todoApp)
//以组件的形式为Provider注入store,使其子组件能在上下文中获得store对象
let rootElement=document.getElementById("box")
	render(
		<Provider store={store}>
		<App/>
		</Provider>,
		rootElement
		)
