import React from 'react'
import Books from './pages/Books'
import Add from './pages/Add'
import Update from './pages/Update'
import { Route, Routes } from 'react-router-dom'
import "./style.css"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Books/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
      </Routes>
    </div>
  )
}

export default App