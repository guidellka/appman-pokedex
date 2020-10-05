import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import './App.css'
import Card from './Card'
import Modal from './Modal'


const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

const App = () => {
  const [allCard, setAllCard] = useState([])
  const [myCards, setMyCards] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  const [typeSearch, setTypeSearch] = useState("")


  const types = Object.getOwnPropertyNames(COLORS)

  useEffect(() => {
    FetchCards()
  }, [textSearch, typeSearch])
  
  const FetchCards = async () => {
    if (textSearch === "" & typeSearch === "") {
      let { data } = await axios.get(`http://localhost:3030/api/cards`)
      let cards = checkDupilcateCard(data)
      setAllCard(cards)
    } else {
      // limit ไม่ออก
      let { data } = await axios.get(`http://localhost:3030/api/cards?limit=10&name=${textSearch}&type=${typeSearch}`)
      let cards = checkDupilcateCard(data)
      setAllCard(cards)
    }
  }

  const checkDupilcateCard = (data) => {
    let temp = data.cards
    myCards.map(pokemon => {
      temp = temp.filter((e) => (e.name !== pokemon.name))
    })
    return temp
  }

  const handleSearchChange = (e) => {
    const { value } = e.target
    setTextSearch(value)
  }

  const handleSelectChange = (e) => {
    const { value } = e.target
    setTypeSearch(value)
  }

  const addCard = (pokemon) => {
    setMyCards([...myCards, pokemon])
    setAllCard(allCard.filter((e) => (e.id !== pokemon.id)))
  }

  const delelteCard = (pokemon) => {
    setMyCards(myCards.filter((e) => (e.id !== pokemon.id)))
    setAllCard([pokemon,...allCard])
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <Fragment>
      <div className="navbar" >
        My Pokedex
      </div>
      <div className="container">
        <ul>
          {myCards.map((pokemon) => (
            <li key={pokemon.id}>
              <Card
                pokemon={pokemon}
                buttonText="X"
                active={() => delelteCard(pokemon)}
              />
            </li>
          ))}

        </ul>
      </div>
      <div className="add-bar">
        <div className="add-button" onClick={toggleModal}>
          +
        </div>
      </div>
      <Modal show={showModal} handleClose={toggleModal}>
        <div className="box-search">
          <input type="text" className="input-search" name="textSearch" onChange={handleSearchChange} placeholder="Find Pokemon" />
          <select onChange={handleSelectChange}  defaultValue="" className="input-select" >
            <option value="" >Selete Type</option>
            {
              types.map( color => (
                <option key={color} value={color}>{color}</option>
              ))
            }
          </select>
        </div>
        <div>
          <ul>
            {allCard.map( (pokemon) => (
              <li key={pokemon.id}>
                <Card
                  pokemon={pokemon}
                  buttonText="Add"
                  active={() => addCard(pokemon)}
                />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </Fragment>
  )
}

export default App
