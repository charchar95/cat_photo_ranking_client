import React, {Component} from 'react';

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name:'',
      img:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.id] : event.target.value})
  }
  handleSubmit (event){
    // event.preventDefault()
    const cat = {
      name: this.state.name,
      img: this.state.img,
    }
    if (this.props.cat) cat.id = this.props.cat.id
    this.props.handleSubmit(
      event,
      cat
    )
  }

  componentWillMount (){
    if (this.props.cat) {
     const {name, img} = this.props.cat;
     this.setState({
       name: name || '',
       img: img || '',
     });
    }
  }

    render () {
        return (
            <> 
            <form onSubmit={this.handleSubmit}> 
                <input type='text' placeholder='Name' id='name' onChange={this.handleChange} value={this.state.name}></input>
                <input type='text' placeholder='Cat Image URL' id='img' onChange={this.handleChange} value={this.state.img}></input>
                <input type="submit" value="Update This Cat!" />
            </form>
            </>
        )
    }
}
export default Form