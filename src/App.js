import logo from "./logo.svg";
import "./App.css";
import CountryData from "./pages/AllCountries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCountry from "./pages/SingleCountry";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CountryData />}></Route>
                <Route path="/:name" element={<SingleCountry />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
