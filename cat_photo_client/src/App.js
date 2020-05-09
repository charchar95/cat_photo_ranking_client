import React from 'react'
import Form from './components/Form'

class App extends React.Component {
  state = {
    cats: [],
    cat: [],
    firstCat: true,
    formVisible: false
  }
  

  handleDelete = (deletedCat) => {
    fetch(`/cats/${deletedCat.id}`, {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(json => {
      const cats = this.state.cats.filter((cat) => cat.id !== deletedCat.id)
      this.setState({cats})
      console.log('Deleted cat')
      this.shuffleCat()
    })
    .catch(error => console.log(error))
  }

  handleUpdate = (event, formInputs) => {
    event.preventDefault()
    console.log('Handle Update')
    fetch(`http://localhost:3000/cats/${formInputs.id}`, {
      body: JSON.stringify(formInputs),
      method: 'PUT',
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
   }
  })
   .then(updatedCat => {
     this.getCats()
   })
   .catch(error => console.log(error))
  }

  toggleForm = () => {
    this.setState({formVisible: !this.state.formVisible})
  }

  componentDidMount(){
    this.getCats()
  }

  getCats () {
    fetch('http://localhost:3000/cats')
    .then(response => response.json())
    .then(json => this.setState({ cats: json }))
    .catch(error => console.error(error))
  }

  shuffleCat(){
    let random = Math.floor(Math.random()*40)
    let oneCat = this.state.cats[random]
    this.setState({ 
      cat: oneCat,
      firstCat: false
    })
    // console.log("shuffle cat" + this.state.cat)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
           CATS!
        </div> 
        {this.state.firstCat ? 
        <>
        <button onClick={()=> this.shuffleCat()}>I would love to see a cat today</button>
       </>
      : null}

      {!this.state.firstCat ? 
      <>
        <h3>{ this.state.cat.name }</h3>
         <img src={this.state.cat.img} width="35%" height="35%"/> 
         <button onClick={()=> this.shuffleCat()}>NICE</button>
         <button onClick={()=> this.shuffleCat()}>Nah</button>
         <button onClick={this.toggleForm}>Edit this Cat</button>
         <button onClick={()=> this.handleDelete(this.state.cat)}>X</button>
      </>
        : null}

      {this.state.formVisible ? 
      <Form 
      cat={this.state.cat} 
      handleSubmit={this.handleUpdate}
       />

        : null}

     </div>  
     
    )
  }
}

export default App
