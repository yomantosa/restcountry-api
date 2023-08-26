import logo from "./logo.svg";
import "./App.css";
import CountryData from "./pages/AllCountries";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CountryData />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
