import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

    onChangeType = (event) => {
      this.setState({
        filters: {
          type: event.target.value
        }
      })
    }

    onFindPetsClick = () => {
      let url = "/api/pets"
      if (this.state.filters.type !== 'all') {
        url += `?type=${this.state.filters.type}`
      }

      fetch(url)
      .then(r => r.json())
      .then(petsJSONArray => {
        this.setState({
          pets: petsJSONArray
        }, () => console.log(this.state.pets))
      })
    }


    onAdoptPet = (id) => {
      let petsArrayCopy = [...this.state.pets]
      let thePet = petsArrayCopy.find(p => p.id === id)
      thePet.isAdopted = true
      this.setState({
        pets: petsArrayCopy
      })

    }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
               onChangeType={this.onChangeType}
               onFindPetsClick={this.onFindPetsClick}
               />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
