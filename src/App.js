import { BrowserRouter,Route } from "react-router-dom"
import React, { Component } from "react"
import Home from "./pages/home/Home"
import Detail from "./pages/detail/Detail";
import "./assets/style/reset.css"
import Celebrity from "./common/celebrity/Celebrity";

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home}/>
          <Route path="/detail/:movie_id" exact component={Detail}/>
          <Route path="/celebrity/:celebrity_id" exact component={Celebrity}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
