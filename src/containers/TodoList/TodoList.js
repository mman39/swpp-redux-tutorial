import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { withRouter } from "react-router";
import "./TodoList.css";

class TodoList extends Component {
    state = {
        todos: [
            { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
            { id: 2, title: 'Movie', content: 'watch movie', done: false },
            { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
        ],
        selectedTodo: null,
    }
    render() {
        const todos = this.props.storedTodos.map((td)=> {
            return ( <Todo key={td.id} title={td.title} done={td.done} 
                clickDetail={() => this.clickTodoHandler(td)}
                clickDone={() => this.props.onToggleTodo(td.id)}
                clickDelete={() => this.props.onDeleteTodo(td.id)} /> );
        });
        let todoDetail = null;
        if (this.state.selectedTodo) {
            todoDetail = <TodoDetail title={this.state.selectedTodo.title}
            content={this.state.selectedTodo.content} />
        }
        return (
            <div className="TodoList">
                <div className="title">{this.props.title}</div>
                <div className="todos">{todos}</div>
                {todoDetail}
                <NavLink to="new-todo" exact>New Todo</NavLink>
            </div>
        );
    }
    clickTodoHandler = td => {
        this.props.history.push("/todos/"+ td.id);
    }
}
const mapStateToProps = state => {
    return {
        storedTodos: state.td.todos
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onToggleTodo: (id) =>
            dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id }),
        onDeleteTodo: (id) =>
            dispatch({ type: actionTypes.DELETE_TODO, targetID: id }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));