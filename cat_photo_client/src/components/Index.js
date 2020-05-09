import React, {Component} from 'react';

class Index extends Component {
 
  render(){
    return (
      <div>
        {this.props.cats.map(cat => {
            return (
            <div className="index" key={cat.id}>
                <h3>{ this.props.cat.name }</h3>
                <img src={this.props.cat.img} width="35%" height="35%"/> 
            </div>
        )
        })}
    </div>
      )
  }
}

export default Index
