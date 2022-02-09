import "./App.css";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./components/P_Homepage";
import Article from "./components/P_Article";

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState("jessjelly");
  return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
