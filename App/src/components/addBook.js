import React,{Component} from 'react';
import axios from 'axios';
import './addBook.css';

class addBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          author: '',
          description: '',
          published_date: Date.now,
          publisher: '',
          update_date: Date.now,
          message: ''
        }
      }
      componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/book')
        .then((res) => {
          //console.log(this.state.books)
        })
        .catch((error) => {
          if(error.response.status === 401) {
            this.props.history.push('/login')
          }
        });
      }

      onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {title,author,description,published_date,publisher,update_date} = this.state;
        axios.post('/book', {title,author,description,published_date,publisher,update_date})
        .then((response)=>{
            //console.log("Here");
            if(response.status !== 401){
            this.setState({message: "Insertion Successful"})
            //axios.request('/',{headers: {'abc':'def'}})
            // .then((res)=>{
                
            // })

            setTimeout(()=> {this.props.history.push('/')},3000)
            
        }
            else{
                console.log("Error")
            }
        })
        .catch((error)=>{
            if(error.response.status === 401){
                this.setState({message: "You are not authorised "})
            }

        })
    }

      render() {
        const {title,author,description,published_date,publisher,update_date,message} = this.state;
        return(<div class="container">
            <form onSubmit={this.onSubmit}>
            {message !== '' && <div class="alert alert-warning alert-dismissible" role="alert">{message}</div>}
                <h2 class="form-signin-headin">Enter Book Details</h2>
                <label for="inputTitle" class="sr-only">Book Title</label>
                    <input type="string" class="form-control" placeholder="Enter Book Title" name="title" value={title} onChange={this.onChange} required></input>
                <label for="inputAuthor" class="sr-only">Author</label>
                    <input type="string" class="form-control" placeholder="Enter Author's Name" name="author" value={author} onChange={this.onChange} required></input>
                <label for="inputDescription" class="sr-only">Description</label>
                    <input type="string" class="form-control" placeholder="Enter Book Description" name="description" value={description} onChange={this.onChange} required></input>
                <label for="inputPublishedDate" class="sr-only">Published Date</label>
                    <input type="date" class="form-control" placeholder="Enter date of Publishion" name="published_date" value={published_date} onChange={this.onChange} required></input>
                <label for="inputPublisher" class="sr-only">Publisher</label>
                    <input type="string" class="form-control" placeholder="Enter name of Publisher" name="publisher" value={publisher} onChange={this.onChange} required></input>
                <label for="inputUpdateDate" class="sr-only">Update Date</label>
                    <input type="date" class="form-control" placeholder="Enter date of Updation" name="update_date" value={update_date} onChange={this.onChange}></input>
                <button class="btn btn-primary btn-block" type="submit">Submit</button>
            </form>
        </div>)
      }
}

export default addBook;