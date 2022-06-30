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
import LongCommentDetail from "./pages/longCommentDetail/LongCommentDetail";
import Login from "./pages/login/Login";
import Personal from "./pages/personal/Personal";
import Management from "./pages/management/Management";
import Page404 from "./pages/page404/Page404";
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
          <Route path="/longCommentDetail/:longCommentDetail_id/:scrollTop"  element={<LongCommentDetail/>}/>
          <Route path="/writeLongComment/:movie_id"  element={<WriteLongComment/>}/>
          <Route path="/notice/:user_id"  element={<Notice/>}/>
          <Route path="/subjectSearch/:searchContent/:searchType"  element={<SubjectSearch/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/personal/:user_id"  element={<Personal/>}/>
          <Route path="/management" element={<Management/>}></Route>
          <Route path="*" element={<Page404/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;

// import { BrowserRouter,Route,Routes } from "react-router-dom"
// import React, { Component,Suspense, lazy } from "react"
// import "./assets/style/reset.css"
// const Home = lazy(() => import("./pages/home/Home"))
// const Detail = lazy(() => import("./pages/detail/Detail"))
// const Celebrity = lazy(() => import("./pages/celebrity/Celebrity"))
// const WriteLongComment = lazy(() => import("./pages/writeLongComment/WriteLongComment"))
// const Notice = lazy(() => import("./pages/notice/Notice"))
// const ShortComments = lazy(() => import("./pages/shortComments/ShortComments"))
// const LongComments = lazy(() => import("./pages/longComments/LongComments"))
// const SubjectSearch = lazy(() => import("./pages/subjectSearch/SubjectSearch"))
// const LongCommentDetail = lazy(() => import("./pages/longComments/LongComments"))
// const Login = lazy(() => import("./pages/login/Login"))
// const Personal = lazy(() => import("./pages/personal/Personal"))
//
// class App extends Component{
//   render() {
//     return(
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             <Route path="/"  element={<Home/>}/>
//             <Route path="/detail/:movie_id"  element={<Detail/>}/>
//             <Route path="/celebrity/:celebrity_id"  element={<Celebrity/>}/>
//             <Route path="/shortComments/:movie_id/:page/:commentType" element={<ShortComments/>}/>
//             <Route path="/longComments/:movie_id/:page"  element={<LongComments/>}/>
//             <Route path="/longCommentDetail/:longCommentDetail_id/:scrollTop"  element={<LongCommentDetail/>}/>
//             <Route path="/writeLongComment/:movie_id"  element={<WriteLongComment/>}/>
//             <Route path="/notice/:user_id"  element={<Notice/>}/>
//             <Route path="/subjectSearch/:searchContent/:searchType"  element={<SubjectSearch/>}/>
//             <Route path="/login"  element={<Login/>}/>
//             <Route path="/personal/:user_id"  element={<Personal/>}/>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     )
//   }
// }
//
// export default App;
