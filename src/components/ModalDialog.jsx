import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const ModalDialog = ({ children }) => {
    // Popup Modal
    const [showModal, setShowModal] = React.useState(false);
    const [countryData, setCountryData] = useState([]);
    const [name, setName] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.innerText);
    };

    useEffect(() => {
        handleSearch();
    }, [name]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
            );
            setCountryData(response.data);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    return (
        <>
            <a
                onFocus={handleNameChange}
                onClick={() => {
                    setShowModal(true);
                }}
                style={{ textDecoration: "none" }}
                href="/#"
            >
                {children}
            </a>

            {showModal ? (
                <>
                    <Box sx={{ m: 5 }}>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-auto my-6 mx-auto max-h-screen">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {children}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    {countryData.map((country, index) => (
                                        <>
                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                    <CardMedia
                                                        sx={{
                                                            height: 300,
                                                            width: 550,
                                                        }}
                                                        image={
                                                            country.flags.png
                                                        }
                                                        title="flag"
                                                    />
                                                    {/* Map all name.official */}
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                    >
                                                        {country.name.official}
                                                    </Typography>
                                                </p>
                                            </div>

                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                    <Grid item md={3}>
                                                        {/* Render country data */}

                                                        {/* Map all country.cca2 */}
                                                        <Typography
                                                            variant="p"
                                                            color="text.secondary"
                                                        >
                                                            {country.cca2}
                                                        </Typography>
                                                        <br />

                                                        {/* Map all country.cca3 */}
                                                        <Typography
                                                            variant="p"
                                                            color="text.secondary"
                                                        >
                                                            {country.cca3}
                                                        </Typography>

                                                        {/* Check & Map all country.nativeName */}
                                                        <Typography
                                                            variant="h5"
                                                            component="div"
                                                        >
                                                            Native Name
                                                        </Typography>
                                                        {country.name
                                                            .nativeName && (
                                                            <>
                                                                {Object.keys(
                                                                    country.name
                                                                        .nativeName
                                                                ).map(
                                                                    (
                                                                        languageCode
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                languageCode
                                                                            }
                                                                        >
                                                                            <h2>
                                                                                {languageCode.toUpperCase()}
                                                                            </h2>
                                                                            <p>
                                                                                Official
                                                                                Name:{" "}
                                                                                {
                                                                                    country
                                                                                        .name
                                                                                        .nativeName[
                                                                                        languageCode
                                                                                    ]
                                                                                        .official
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                Common
                                                                                Name:{" "}
                                                                                {
                                                                                    country
                                                                                        .name
                                                                                        .nativeName[
                                                                                        languageCode
                                                                                    ]
                                                                                        .common
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
                                                                <Typography
                                                                    variant="h5"
                                                                    component="div"
                                                                >
                                                                    Alt Name
                                                                </Typography>
                                                                {country.altSpellings.map(
                                                                    (
                                                                        altSpelling,
                                                                        index
                                                                    ) => (
                                                                        <Typography
                                                                            variant="p"
                                                                            color="text.secondary"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                altSpelling
                                                                            }{" "}
                                                                            <br />
                                                                        </Typography>
                                                                    )
                                                                )}
                                                            </>
                                                        )}
                                                        {/* Check idd */}
                                                        {country.idd && (
                                                            <>
                                                                <Typography
                                                                    variant="h5"
                                                                    component="div"
                                                                >
                                                                    IDD
                                                                </Typography>
                                                                {Object.keys(
                                                                    country.idd
                                                                ).map(
                                                                    (
                                                                        rootAndSuffiexs
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                rootAndSuffiexs
                                                                            }
                                                                        >
                                                                            <h2>
                                                                                {rootAndSuffiexs.toUpperCase()}
                                                                            </h2>
                                                                            <p>
                                                                                root:{" "}
                                                                                {
                                                                                    country
                                                                                        .idd
                                                                                        .root
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                suffixes:{" "}
                                                                                {
                                                                                    country
                                                                                        .idd
                                                                                        .suffixes
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </>
                                                        )}
                                                    </Grid>
                                                </p>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Ok
                                                </button>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black">
                            {" "}
                        </div>
                    </Box>
                </>
            ) : null}
        </>
    );
};

export default ModalDialog;
