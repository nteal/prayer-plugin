
//Idea.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';



class Idea extends Component {
 constructor(props) {
 super(props);
     this.state= {
       toBeUpdated: false,
       name: '',
       content: ''
   };
 //binding all our functions to this class
 this.deleteIdea = this.deleteIdea.bind(this);
 this.updateIdea = this.updateIdea.bind(this);
 this.handleNameChange = this.handleNameChange.bind(this);
 this.handleContentChange = this.handleContentChange.bind(this);
 this.handleIdeaUpdate = this.handleIdeaUpdate.bind(this);
 }
 updateIdea(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
 }
 handleIdeaUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if name or content changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let name = (this.state.name) ? this.state.name : null;
    let content = (this.state.content) ? this.state.content : null;
    let idea = { name: name, content: content};
    this.props.onIdeaUpdate(id, idea);
    this.setState({
       toBeUpdated: !this.state.toBeUpdated,
       name: '',
       content: ''
    })
 }
 deleteIdea(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onIdeaDelete(id);
    console.log('oops deleted', id);
 }
 handleContentChange(e) {
    this.setState({ content: e.target.value });
 }
 handleNameChange(e) {
    this.setState({ name: e.target.value });
 }
 rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
 }
 render() {
    return (

       <div style={ style.idea }>
          <Grid fluid>
             <Row>
                <Col xs>       <h3>{this.props.name}</h3>
                       <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                       <RaisedButton style={ style.updateLink } href='#' onClick={ this.updateIdea } label="update"/>
                       <RaisedButton style={ style.deleteLink } href='#' onClick={ this.deleteIdea } label="delete"/>
                       { (this.state.toBeUpdated)
                       ? (<form onSubmit={ this.handleIdeaUpdate }>
                       <input
                       type='content'
                       placeholder='Update name…'
                       style={ style.ideaFormName }
                       value={ this.state.name }
                       onChange= { this.handleNameChange } />
                       <input
                       type='content'
                       placeholder='Update your idea…'
                       style= { style.ideaFormContent }
                       value={ this.state.content }
                       onChange={ this.handleContentChange } />
                       <input
                       type='submit'
                       style={ style.ideaFormPost }
                       value='Update' />
                       </form>)
                       : null}</Col>
             </Row>
          </Grid>

       </div>
    )
    }
}
export default Idea;
