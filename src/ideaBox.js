//IdeaBox.js
import React, { Component } from 'react';
import IdeaList from './ideaList';
import IdeaForm from './IdeaForm';
import style from './style';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class IdeaBox extends Component {
 constructor(props) {
 super(props);
 this.state = { data: [] };
 this.loadIdeasFromServer = this.loadIdeasFromServer.bind(this);
 this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this);
 this.handleIdeaDelete = this.handleIdeaDelete.bind(this);
 this.handleIdeaUpdate = this.handleIdeaUpdate.bind(this);
 }
 loadIdeasFromServer() {
   axios.get(this.props.url)
    .then(res => {
      this.setState({
        data: res.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
 }
 handleIdeaSubmit(idea) {
   let ideas = this.state.data;
   ideas.id = Date.now();
   console.log(ideas, 'ideas')
   let newIdeas = ideas.concat([idea]);
   this.setState({ data: newIdeas });
    axios.post(this.props.url, idea)
   .catch(err => {
      console.error(err);
      this.setState({ data: ideas });
   });
   console.log('this is working')
}
handleIdeaDelete(id) {
axios.delete(`${this.props.url}/${id}`)
.then(res => {
console.log('Idea deleted');
})
.catch(err => {
console.error(err);
});
}
handleIdeaUpdate(id, idea) {
//sends the idea id and new author/text to our api
axios.put(`${this.props.url}/${id}`, idea)
.catch(err => {
console.log(err);
})
}
componentDidMount() {
   this.loadIdeasFromServer();
   setInterval(this.loadIdeasFromServer, this.props.ideaInterval);
}
 render() {
    return (
  <MuiThemeProvider>
     <div style={ style.ideaBox }>
     <h2 style={ style.title }>Love is ____</h2>
     <nav>
         <ul>
            <a> Home</a>
            <a> About</a>
            <a> Projects </a>
         </ul>
      </nav>

        <IdeaList
          onIdeaDelete={ this.handleIdeaDelete }
          onIdeaUpdate={ this.handleIdeaUpdate }
          data={ this.state.data }/>
          <IdeaForm onIdeaSubmit={ this.handleIdeaSubmit }/>


     </div>
   </MuiThemeProvider>
     )
 }
}
export default IdeaBox;
