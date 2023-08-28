import * as React from "react";
import { Box, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

// axios
import axios from "axios";
import { useState, useEffect } from "react";

// Fuse.js
import Fuse from "fuse.js";
import ModalDialog from "../../components/ModalDialog";

// Render CountryCard
const CountryCard = ({ country }) => (
    <>
        <Grid item md={3}>
            {/* Render country data */}
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                    sx={{ height: 170 }}
                    image={country.flags.png}
                    title="green iguana"
                />
                <CardContent>
                    {/* Map all name.official */}
                    <Typography gutterBottom variant="h5" component="div">
                        <ModalDialog>{country.name.official}</ModalDialog>
                    </Typography>

                    {/* Map all country.cca2 */}
                    <Typography variant="p" color="text.secondary">
                        {country.cca2}
                    </Typography>
                    <br />

                    {/* Map all country.cca3 */}
                    <Typography variant="p" color="text.secondary">
                        {country.cca3}
                    </Typography>

                    {/* Check & Map all country.nativeName */}
                    <Typography variant="h5" component="div">
                        Native Name
                    </Typography>
                    {country.name.nativeName && (
                        <>
                            {Object.keys(country.name.nativeName).map(
                                (languageCode) => (
                                    <div key={languageCode}>
                                        <h2>{languageCode.toUpperCase()}</h2>
                                        <p>
                                            Official Name:{" "}
                                            {
                                                country.name.nativeName[
                                                    languageCode
                                                ].official
                                            }
                                        </p>
                                        <p>
                                            Common Name:{" "}
                                            {
                                                country.name.nativeName[
                                                    languageCode
                                                ].common
                                            }
                                        </p>
                                    </div>
                                )
                            )}
                        </>
                    )}

                    {/*Check & Map all country.altSpellings */}
                    {country.altSpellings && (
                        <>
                            <Typography variant="h5" component="div">
                                Alt Name
                            </Typography>
                            {country.altSpellings.map((altSpelling, index) => (
                                <Typography
                                    variant="p"
                                    color="text.secondary"
                                    key={index}
                                >
                                    {altSpelling} <br />
                                </Typography>
                            ))}
                        </>
                    )}
                    {/* Check idd */}
                    {country.idd && (
                        <>
                            <Typography variant="h5" component="div">
                                IDD
                            </Typography>
                            {Object.keys(country.idd).map((rootAndSuffiexs) => (
                                <div key={rootAndSuffiexs}>
                                    <h2>{rootAndSuffiexs.toUpperCase()}</h2>
                                    <p>root: {country.idd.root}</p>
                                    <p>suffixes: {country.idd.suffixes}</p>
                                </div>
                            ))}
                        </>
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
    </>
);

// CountryData Function
function CountryData() {
    // Contries data State
    const [countries, setCountries] = useState([]);

    // Search State
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination Normal State
    const [currentPage, setCurrentPage] = useState(1);

    // Sorting State
    const [sortOrder, setSortOrder] = useState("asc");

    // Axios Fetch Data from "https://restcountries.com/v3.1/all"
    const getAllCountry = async () => {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const data = res.data;
        setCountries(data);
    };

    useEffect(() => {
        getAllCountry();
    }, []);

    // Pagination
    const rowsPerPage = 25;
    // totalPages
    const totalPages = Math.ceil(countries.length / rowsPerPage);
    // searchResultsTotalPages
    const searchResultsTotalPages = Math.ceil(
        searchResults.length / rowsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Start Page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Fuzzy Search
    const performSearch = (query) => {
        const options = {
            keys: ["name.official", "name.common"], // Search keys
            threshold: 0.3, // Adjust the fuzziness threshold as needed
        };

        const fuse = new Fuse(countries, options);
        const results = fuse.search(query);
        setSearchResults(results);
    };

    // Sorting Function
    const sortCountries = (countriesToSort) => {
        const sortedCountries = [...countriesToSort].sort((a, b) => {
            const nameA =
                a.name && a.name.official ? a.name.official.toLowerCase() : "";
            const nameB =
                b.name && b.name.official ? b.name.official.toLowerCase() : "";

            if (sortOrder === "asc") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
        return sortedCountries;
    };

    // Sort
    const sortItemCountries = (countriesToSort) => {
        const sortedItemCountries = [...countriesToSort].sort((a, b) => {
            const nameA =
                a.item.name && a.item.name.official
                    ? a.item.name.official.toLowerCase()
                    : "";
            const nameB =
                b.item.name && b.item.name.official
                    ? b.item.name.official.toLowerCase()
                    : "";

            if (sortOrder === "asc") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
        return sortedItemCountries;
    };

    // Get the data to display based on search and pagination

    const sortedSearchResults = sortItemCountries(searchResults);
    console.log("searchResults", searchResults);
    const sortedCountries = sortCountries(countries);
    console.log("countries", countries);

    const displayedCountries = searchQuery
        ? sortItemCountries(sortedSearchResults).slice(startIndex, endIndex)
        : sortedCountries.slice(startIndex, endIndex);

    return (
        <>
            <Box>
                {/* Input to do Fuzzy Search */}
                <Box sx={{ m: 4, display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{ display: "inline", textAlign: "center", mr: 3 }}
                    >
                        Input to search
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Search by country name"
                        variant="outlined"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                            performSearch(e.target.value);
                        }}
                    />
                </Box>

                {/* Sorting Buttons */}
                <Button
                    sx={{ m: 4 }}
                    variant="contained"
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                >
                    {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
                </Button>

                {/* Displayed Countries */}
                <Box sx={{ mx: 4 }}>
                    <Pagination
                        count={
                            searchQuery ? searchResultsTotalPages : totalPages
                        }
                        page={currentPage}
                        onChange={(event, newPage) => handlePageChange(newPage)}
                        color="primary"
                    />
                    <Grid container spacing={5} sx={{ margin: "4px" }}>
                        {displayedCountries.map((country, index) => (
                            <CountryCard
                                key={index}
                                country={country.item || country} // Adjust this part based on your data structure
                            />
                        ))}
                    </Grid>
                    <Pagination
                        count={
                            searchQuery ? searchResultsTotalPages : totalPages
                        }
                        page={currentPage}
                        onChange={(event, newPage) => handlePageChange(newPage)}
                        color="primary"
                    />
                </Box>
            </Box>
        </>
    );
}

export default CountryData;
export { CountryCard };
