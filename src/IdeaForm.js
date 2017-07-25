//ideaForm.js
import React, { Component } from 'react';
import style from './style';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class IdeaForm extends Component {
 constructor(props) {
 super(props);
 this.state = { name: '', content: '' };
 this.handleNameChange = this.handleNameChange.bind(this);
 this.handleContentChange = this.handleContentChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
 }
 handleNameChange(e) {
 this.setState({ name: e.target.value });
 }
 handleContentChange(e) {
 this.setState({ content: e.target.value });
 }
 handleSubmit(e) {
 e.preventDefault();
 let name = this.state.name.trim();
 let content = this.state.content.trim();
 if (!content || !name) {
 return;
 }
 this.props.onIdeaSubmit({ name: name, content: content });
 this.setState({ name: '', content: '' });
 }
 render() {
 return (
<form style={ style.ideaForm } onSubmit={ this.handleSubmit }>
 <TextField
 id="adfs"
 type='content'
 placeholder='Your name…'
 style={ style.ideaFormName}
 value={ this.state.name }
 onChange={ this.handleNameChange } />
 <TextField
 id="dasflakj"
 type='content'
 placeholder='Say something…'
 style={ style.ideaFormContent}
 value={ this.state.content }
 onChange={ this.handleContentChange } />
 <RaisedButton type='submit'
 style={ style.ideaFormPost }
 label="Post"/>
 </form>
 )
 }
}
export default IdeaForm;
