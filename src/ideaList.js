//IdeaList.js
import React, { Component } from 'react';
import Idea from './idea';
import style from './style';
import Card from 'material-ui/Card/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import ReactGridLayout from 'react-grid-layout';


class IdeaList extends Component {

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
export default IdeaList;
