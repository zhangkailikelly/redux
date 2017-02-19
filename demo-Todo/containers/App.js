/**
 * connect方法将App组件转化为容器组件
 */
import React,{Component,PropTypes} from 'react'
//connect组件提供dispatch方法
import {connect} from 'react-redux'
import {addTodo,completeTodo,setVisibilityFilter,VisibilityFilters} from '../actions'
//展示组件
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'


//内容部分当发生动作时产生新的action同时调用dispatch方法
 class App extends Component{
	render(){
		const {dispatch,visibleTodos,visibilityFilter}=this.props
		return (
			<div>

			<AddTodo onAddClick={text=>dispatch(addTodo(text))}/>
			<TodoList todos={visibleTodos} onTodoClick={index=>dispatch(completeTodo(index))}/>
			<Footer filter={visibilityFilter} onFilterChange={nextFilter=>dispatch(setVisibilityFilter(nextFilter))}/>
			</div>)
	}
};

//属性过滤
App.PropTypes={
	visibleTodos:PropTypes.arrayOf(PropTypes.shape({
		text:PropTypes.string.isRequired,
		completed:PropTypes.bool.isRequired
	}).isRequired).isRequired,
	visibilityFilter:PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
			]).isRequired
}


function selectTodos(todos,filter){
	var arr=[];

	switch(filter){
		case VisibilityFilters.SHOW_ALL:
		return todos;
		case VisibilityFilters.SHOW_COMPLETED:
		 todos.map(function(index){
			if(index.completed){
				arr.push(index)
			}
		});
		 console.log(arr)
		return arr;

		case VisibilityFilters.SHOW_ACTIVE:
		return todos.filter(todo=>!todo.completed)
	}
}


function select(store){
	return {
		visibleTodos:selectTodos(store.todos,store.visibilityFilter),
		visibilityFilter:store.visibilityFilter
		}
}
//函数将被调用两次。第一次是设置参数，第二次是组件与 Redux store 连接
//包装component，注入dispatch和state到其默认的connect(select)(App)中
export default connect(select)(App)