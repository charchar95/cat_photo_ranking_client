import React from 'react'
import './App.css';
import Form from './components/Form'
import Add from './components/Add'


class App extends React.Component {
  state = {
    cats: [],
    cat: [],
    firstCat: true,
    editVisible: false,
    addVisible: false, 
    seeAllCats: false
  }
  
  handleAddCat = (newCat) => {
    console.log("Handle Add User - New Cat", newCat);
    const copyCat = [...this.state.cats]
    copyCat.unshift(newCat);
    this.setState({
      cats: copyCat
    })
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

  toggleEditForm = () => {
    this.setState({
      editVisible: !this.state.editVisible,
      addVisible: false
    })

  }

  toggleAddForm = () => {
    this.setState({
      addVisible: !this.state.addVisible,
      editVisible: false, 
      firstCat: true,
      seeAllCats: false,
    })
  }

  toggleSeeCats = () => {
    this.setState({
      seeAllCats: !this.state.seeAllCats,
      editVisible: false,
      addVisible: false,
      firstCat: true,
    })
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
      firstCat: false,
      editVisible: false,
      addVisible: false,
      seeAllCats: false
    })
    // console.log("shuffle cat" + this.state.cat)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>CATS!</h1> 
        <button onClick={this.toggleAddForm}>Add a new cat</button>
        <button onClick={this.toggleSeeCats}>See All Cats</button>
        <hr></hr>
        </div> 
        {this.state.firstCat ? 
        <>
        <button onClick={()=> this.shuffleCat()}>Show me a cat</button>
       </>
      : null}

      {!this.state.firstCat ? 
      <>
        <h3>{ this.state.cat.name }</h3>
         <img src={this.state.cat.img} width="35%" height="35%"/> 
         <div className="catbuttons">
          <button className="nice" onClick={()=> this.shuffleCat()}>NICE</button>
          <button className="nah" onClick={()=> this.shuffleCat()}>Nah</button>
          <button onClick={this.toggleEditForm}>Edit this Cat</button>
          <button onClick={()=> this.handleDelete(this.state.cat)}>X</button>
         </div>
      </>
        : null}

      {this.state.editVisible ? 
      <Form 
      cat={this.state.cat} 
      handleSubmit={this.handleUpdate}
       />
        : null}


      {this.state.addVisible ? 
      <Add 
      cat={this.state.cat} 
      handleSubmit={this.handleAddCat}
       />
        : null}

    {this.state.seeAllCats ? 
         <div>
           <h1>see the cats</h1>
         {this.state.cats.map(cat => {
             return (
             <div className="index" key={cat.id}>
               <div className="column">
                 <h3>{ cat.name }</h3>
                 <img src={cat.img} width="35%" height="35%"/> 
              </div>
             </div>
         )
         })}
     </div>
        : null}

     </div>  
     
    )
  }
}

export default App
