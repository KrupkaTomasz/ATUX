

import Homepage from "./components/Homepage";
import Formpage from "./components/Formpage";
import Listpage from "./components/Listpage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
          </Routes>
          <Routes>
            <Route exact path="/form" element={<Formpage />} />
          </Routes>
          <Routes>
            <Route exact path="/list" element={<Listpage />} />
          </Routes>
        </div>      
      </div>
    </Router>
  );

}

export default App;
