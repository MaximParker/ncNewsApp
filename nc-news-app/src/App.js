import "./App.css";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Topicpage from "./components/P_Topicpage";
import Article from "./components/P_Article";
import Error404 from "./components/P_404";
import Error500 from "./components/P_500";

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState("jessjelly");
  return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Topicpage />} />
          <Route path="/t" element={<Topicpage />} />
          <Route path="/t/:topic" element={<Topicpage />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
