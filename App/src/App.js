import React, { Component} from 'react';
// import logo from './logo.svg';
import './App1.css';
import axios from "axios";
import {Link} from 'react-router-dom';

//var createReactClass = require('create-react-class');

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/book')
    .then((res) => {
      this.setState({ books: res.data})
      //console.log(this.state.books)
    })
    .catch((error) => {
      if(error.response.status === 401) {
        this.props.history.push('/login')
      }
    });
  }
  logout(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  render(){
    return(
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>List of Books</h3>
            <button class="btn btn-primary btn-large logoutbtn" onClick={this.logout}>
              Logout
            </button>
          </div>
          <div class="panel-body">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) => {
                  return(
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                    <hr/>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Link to="/addBook">
          <button className="btn btn-primary btn-large addbtn">Add Books</button> 
          </Link>
      </div>
      </div>
    )
  }
}

export default App;
