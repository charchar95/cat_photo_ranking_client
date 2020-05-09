import React, {Component} from 'react';

class Add extends Component {
  state = {
      name: "",
      img: ""
  }

  handleChange = (event) => {
    this.setState({
        [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("/cats", {
      method: "POST",
      body: JSON.stringify({ 
        name: this.state.name,
        img: this.state.img,
        }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJson => {
        this.props.handleAddCat(resJson)
        // this.setState({
        //     name:'',
        //     img:'',
        // });
      })
      .catch(error => console.error({ Error: error }));
  };


    render () {
        return (
            <> 
            <form onSubmit={this.handleSubmit}> 
                <input type='text' placeholder='Name' id='name' onChange={this.handleChange} value={this.state.name}></input>
                <input type='text' placeholder='Cat Image URL' id='img' onChange={this.handleChange} value={this.state.img}></input>
                <input type="submit" value="Add New Cat!" />
            </form>
            </>
        )
    }
}
export default Add