import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import Home from './pages/Home/Index'
import CreatePoint from './pages/CreatePoints'

const Routesf = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-point" element={<CreatePoint />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routesf