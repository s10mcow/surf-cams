import React from 'react'
import AppBar from './components/AppBar'
import PlayersContainer from './containers/PlayersContainer'

export default function App() {
  window.location.href = 'https://www.howisthe.surf'
  return (
    <>
      <AppBar />
      <PlayersContainer />
    </>
  )
}
