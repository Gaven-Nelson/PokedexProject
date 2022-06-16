import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import pikachu from ".//runningPikachu.gif";

const App = () => {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  let name = searchParams.get("name");
  let page = searchParams.get("page");

  function debounce(func, duration) {
    let timeout;
    return function (...args) {
      const effect = () => {
        timeout = null;
        return func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(effect, duration);
    };
  }

  let { pageNumber = 1 } = useParams();
  let searchPageNumber = 1;
  const navigate = useNavigate();

  const handleSearchInput = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 500);

  //wraps to page 37 if minus is clicked on page 1
  const handleClickMinus = (event) => {
    if (pageNumber > 1) {
      pageNumber = pageNumber - 1;
    } else if (pageNumber == 1) {
      pageNumber = 37;
    }

    navigate("/pokemon/page/" + pageNumber);
  };

  //wraps to page 1 if next button is click on page 37
  const handleClickPlus = (event) => {
    if (pageNumber < 37) {
      pageNumber = +pageNumber + +1;
    } else if (pageNumber == 37) {
      pageNumber = 1;
    }

    navigate("/pokemon/page/" + pageNumber);
  };

  useEffect(() => {
    const nameUrl = `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${searchPageNumber}&name=${searchTerm}`;
    const pageUrl = `https://intern-pokedex.myriadapps.com/api/v1/pokemon/?page=${pageNumber}`;

    const fetchPageData = async () => {
      try {
        const response = await fetch(pageUrl);
        const json = await response.json();
        setItems(json);
        setLoading(false);
      } catch (hasError) {
        console.log("error", hasError);
      }
    };

    const fetchNameData = async () => {
      try {
        const response = await fetch(nameUrl);
        const json = await response.json();
        setItems(json);
        setLoading(false);
      } catch (hasError) {
        console.log("error", hasError);
      }
    };
    if (searchTerm) {
      fetchNameData();
    } else if (pageNumber) {
      fetchPageData();
    }
  }, [pageNumber, searchTerm, searchPageNumber]);

  if (loading) {
    return (
      <div className="loadscreen">
        <img className="loadingScreen" src={pikachu} width={400} height={300} />{" "}
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="page-container2">
      <h1 className="app-title">
        <style>
          @import url('http://fonts.cdnfonts.com/css/pokemon-solid');
        </style>
        P o k é d e x
      </h1>
      <div className="app-navigation-header">
        <div className="back-arrowContainer">
          <button className="back-arrow" onClick={handleClickMinus}>
            &#10094;
          </button>
        </div>
        <div className="search-bar">
          <div className="wrapper">
            <img
              className="search-icon"
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
            />
            <input
              className="search"
              type="text"
              placeholder="Search"
              onChange={handleSearchInput}
            />

            <img
              className="clear-icon"
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
            />
          </div>
        </div>
        <div className="forward-arrowContainer">
          <button className="forward-arrow" onClick={handleClickPlus}>
            &#10095;
          </button>
        </div>
      </div>

      <div className="app-container">
        <div className="grid2">
          {items.data.map((item) => (
            <PokemonCard item={item} key={item.id}></PokemonCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
