import "./theme/variables.css";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateShare from "./pages/UpdateShare/UpdateShare";
import MyShares from "./pages/MyShares/MyShares";
import Recent from "./pages/Recent/Recent";
import NotFound from "./pages/Errors/NotFound/NotFound";
import Share from "./pages/Share/Share";
import NewShare from "./pages/NewShare/NewShare";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/*" element={<NotFound />} />

          <Route path="/" element={<Navigate to="/myshares" />} />
          <Route path="/share" element={<Share />} />
          <Route path="/newshare" element={<NewShare />} />
          <Route path="/updateshare" element={<UpdateShare />} />
          <Route path="/myshares" element={<MyShares />} />
          <Route path="/recent" element={<Recent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
