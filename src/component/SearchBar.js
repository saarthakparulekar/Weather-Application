import React from "react";
import iconSearch from '../icon-search.svg';
import '../App.css';

function SearchBar(){
    return(
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <img src={iconSearch} alt="search" className="search-icon"/>
                <input className="search-input" placeholder="Search for a place..."/>
            </div>
            <button className="search-btn">Search</button>
        </div>
    )
}

export default SearchBar;