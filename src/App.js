import { BrowserRouter,Route,Routes } from "react-router-dom"
import React, { Component } from "react"
import Home from "./pages/home/Home"
import Detail from "./pages/detail/Detail";

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/detail" element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
