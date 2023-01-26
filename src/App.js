import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import MainPage from "./MainPage";
import ClientPage from "./AdminComponents/Components/ClientsPage/ClientPage";
import MastersPage from "./AdminComponents/Components/MastersPage/MastersPage";
import TownsPage from "./AdminComponents/Components/TownsPage/TownsPage";
import ReservationPage from "./AdminComponents/Components/ReservationPage/ReservationPage";

function App() {
  
  return (

    <Suspense fallback="loading">
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/clients"
              element={
                  <ClientPage />
              }
            />
            <Route
              path="/masters"
              element={
                  <MastersPage />
              }
            />
            <Route
              path="/towns"
              element={
                  <TownsPage />
              }
            />
            <Route
              path="/reservation"
              element={
                  <ReservationPage />
              }
            />
          </Routes>
        </Router>
        
      </div>
    </Suspense>
  );
}

export default App;


