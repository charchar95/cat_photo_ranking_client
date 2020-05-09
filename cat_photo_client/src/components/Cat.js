import React from 'react'

class Cat extends React.Component {
  state = {
    formVisible: false
  }


  toggleForm = () => {
    this.setState({formVisible: !this.state.formVisible})
  }
  handleUpdate = (event, cat) => {
    this.props.handleUpdate(event, cat)
    this.toggleForm()
  }
  render () {
    const {cat, handleDelete} = this.props
    return(
      <>
      {/* {this.state.formVisible
        ? <Form cat={notice} handleSubmit={this.handleUpdate}>
        </Form>

        :  */}
        <div className="cat">
         <h3>{ cat.name }</h3>
         {/* <p>{ cat.author }</p> */}
         <img src={cat.img} width="35%" height="35%"/> 
         <button onClick={()=> handleDelete(cat)}>X</button>
         <button onClick={this.toggleForm}>Edit this Entry</button>
       </div>
       </>
     )
  }
}

export default Cat