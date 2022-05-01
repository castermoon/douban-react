import { BrowserRouter,Route,Routes } from "react-router-dom"
import React, { Component } from "react"
import "./assets/style/reset.css"
import Home from "./pages/home/Home"
import Detail from "./pages/detail/Detail";
import Celebrity from "./pages/celebrity/Celebrity";
import WriteLongComment from "./pages/writeLongComment/WriteLongComment";
import Notice from "./pages/notice/Notice";
import ShortComments from "./pages/shortComments/ShortComments";
import LongComments from "./pages/longComments/LongComments";
import SubjectSearch from "./pages/subjectSearch/SubjectSearch";

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/detail/:movie_id"  element={<Detail/>}/>
          <Route path="/celebrity/:celebrity_id"  element={<Celebrity/>}/>
          <Route path="/shortComments/:movie_id/:page/:commentType" element={<ShortComments/>}/>
          <Route path="/longComments/:movie_id/:page"  element={<LongComments/>}/>
          <Route path="/writeLongComment/:user_id"  element={<WriteLongComment/>}/>
          <Route path="/notice/:user_id"  element={<Notice/>}/>
          <Route path="/subjectSearch/:searchContent/:searchType"  element={<SubjectSearch/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
