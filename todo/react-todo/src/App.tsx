import React, { Component } from "react";
import Header from "./components/utility/Header";
import TodoList from "./components/todo/TodoList";
import TodoAdd from "./components/todo/TodoAdd";
import { ITodo, IPropsApp } from "./components/interfaces";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3333/todos";

class App extends Component<{}, IPropsApp> {
  state: IPropsApp = { list: [] };

  componentDidMount() {
    axios.get(`${API_URL}`).then((res) => this.setState({ list: res.data }));
  }

  // Toggle Complete
  toggleComplete = (id: string) => this.setState({ list: this.state.list.map(this.mapItem(id)) });

  // Map List Items
  mapItem = (id: string) => (item: ITodo) => ({ ...item, completed: item._id === id ? !item.completed : item.completed });

  // Delete Todo Item
  deleteItem = (id: string) => {
    axios.delete(`${API_URL}/${id}`).then((res) => this.setState({ list: [...this.state.list.filter((item) => item._id !== id)] }));
  };

  // Add Todo Item
  addItem = (title: string) => {
    axios.post(API_URL, { title, completed: false }).then((res) => this.setState({ list: [...this.state.list, res.data] }));
  };

  actions = {
    toggleComplete: this.toggleComplete,
    deleteItem: this.deleteItem,
  };

  render() {
    return (
      <div className="App">
        <div className="container mt-4 col-md-5">
          <Header />
          <TodoList list={this.state.list} actions={this.actions} />
          <TodoAdd addItem={this.addItem} />
        </div>
      </div>
    );
  }
}

export default App;
