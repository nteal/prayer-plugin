// import ReactDOM from 'react-dom';
// // import App from './App';
// import IdeaBox from './ideaBox.js'
// import registerServiceWorker from './registerServiceWorker';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// import './index.css';
// injectTapEventPlugin();
//
// ReactDOM.render(<IdeaBox url='http://localhost:3001/api/ideas' ideaInterval={2000} />, document.getElementById('root'));
// registerServiceWorker();


class IdeaBox extends React.Component {
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
     )
 }
}

class IdeaList extends React.Component {

 render() {
 let IdeaNodes = this.props.data.map((idea, i) => {
    return (
        <div style={style.root}>
          <Card>
              <Idea
                content={ idea.content }
                uniqueID={idea['_id']}
                onIdeaDelete={ this.props.onIdeaDelete }
                onIdeaUpdate={ this.props.onIdeaUpdate }
                key={idea['_id']}
                >
               Love is ...{ idea.content }
               by{ idea.name}
              </Idea>
          </Card>
        </div>
            )
    })
 return (
 <div style={ style.IdeaList }>
 { IdeaNodes }
 </div>
 )
 }
}

class IdeaForm extends React.Component {
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
 <input
 id="adfs"
 type='content'
 placeholder='Your name…'
 style={ style.ideaFormName}
 value={ this.state.name }
 onChange={ this.handleNameChange } />
 <input
 id="dasflakj"
 type='content'
 placeholder='Say something…'
 style={ style.ideaFormContent}
 value={ this.state.content }
 onChange={ this.handleContentChange } />
 <input type='submit'
 style={ style.ideaFormPost }
 label="Post"/>
 </form>
 )
 }
}
/* JSON data */
// var myData = [
//   { questionText: "Is introducing React.js into a WordPress environment difficult?", answers: [ "Yes", "No", "Not necessarily" ] },
//   { questionText: "Do you want to learn how?", answers: [ "Sure!", "Well, okay", "Goodbye" ] }
// ];
//
// var answerData = [];
//
// /* React.js Classes */
//
// var Quiz = React.createClass({
//   // The Quiz needs state: The sum total of the selected answers from all the QuizQuestions
//   getInitialState: function() {
//     var quizData = myData;
//     var resultData = {};
//     return {
//       quizData: myData,
//       resultData: answerData
//      };
//   },
//
//   handleChildChange: function(childIndex, childValue) {
//     answerData[childIndex] = {
//       index: childIndex,
//       answerSelected: childValue
//     };
//     this.setState( { resultData: answerData } );
//   },
//
//   render: function() {
//     var quizQuestions = this.state.quizData.map( function( thisQuizQuestion, thisQuestionNumber ) {
//
//       return (
//         <QuizQuestion questionNumber={thisQuestionNumber} question={thisQuizQuestion.questionText} answers={thisQuizQuestion.answers} handleChange={this.handleChildChange} />
//       );
//     }, this );
//
//     var quizResults = this.state.resultData.map( function( thisResult, thisResultNumber ) {
//       return (
//         <div>
//             <QuizResult number={thisResultNumber + 1} result={thisResult.answerSelected} />
//         </div>
//       );
//     } );
//
//     return (
//       <div class="quiz">
//           <h2>Questions</h2>
//           {quizQuestions}
//           <p><hr /></p>
//           <h2>Results</h2>
//           { quizResults }
//       </div>
//     );
//   }
// });
//
//
// var QuizQuestion = React.createClass({
//   // Each QuizQuestion needs state: Which answer is selected
//
//   getInitialState: function() {
//     return { selectedOption: '' };
//   },
//
//   handleChange: function( changeEvent ) {
//     // Set which is checked
//     this.setState({
//       selectedOption: changeEvent.target.value
//     });
//
//     // Pass that information back to the quiz
//     this.props.handleChange(changeEvent.target.name, changeEvent.target.value);
//   },
//
//   render: function() {
//     var quizAnswers = this.props.answers.map( function( thisQuizAnswer, index ) {
//
//       return (
//         <span>
//           <input type="radio" name={ this.props.questionNumber } value={thisQuizAnswer}  onChange={ this.handleChange } checked={ this.state.selectedOption === thisQuizAnswer } ></input>
//           {thisQuizAnswer}
//           <br />
//         </span>
//       );
//     }.bind(this) );
//
//     return (
//       <div class="question">
//         <h3>{this.props.question}</h3>
//         <fieldset>
//           {quizAnswers}
//         </fieldset>
//       </div>
//     );
//   }
// });
//
//
// var QuizResult = React.createClass({
//   render: function() {
//     return (
//       <div class="results">
//           <h3>Question {this.props.number}</h3>
//           You answered <em>{this.props.result}</em>.
//       </div>
//     );
//   }
// });


// ReactDOM.render(<IdeaBox url='http://localhost:3001/api/ideas' ideaInterval={2000} />, document.getElementById('root'));

ReactDOM.render(<IdeaBox url='http://localhost:3001/api/ideas' ideaInterval={2000}/>, document.getElementById('quiz'));
