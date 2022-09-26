import "./App.css";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TopicDetail from "./pages/TopicDetail";
import SelectedTopic from "./pages/SelectedTopic";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/topicdetail/:tpicId"
          element={<TopicDetail></TopicDetail>}
        ></Route>
        <Route path="/selectedTopic" element={<SelectedTopic></SelectedTopic>}></Route>
      </Routes>
    </div>
  );
}

export default App;
