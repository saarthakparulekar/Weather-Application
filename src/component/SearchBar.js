import React, { useState, useEffect, useRef } from "react";
import iconSearch from '../images/icon-search.svg';
import '../App.css';

function SearchBar({ onLocationSelect }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data.results || []);
                    setShowSuggestions(true);
                });
        }, 300);
        return () => clearTimeout(timeoutRef.current);
    }, [query]);

    const handleSelect = (suggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        if (onLocationSelect) {
            onLocationSelect({
                name: suggestion.name,
                latitude: suggestion.latitude,
                longitude: suggestion.longitude
            });
        }
    };

    const handleSearchClick = async () => {
        if (query.length < 2) return;
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            handleSelect(data.results[0]);
        }
    };

    return (
        <div className="search-bar-container" style={{ position: "relative" }}>
            <div className="search-input-wrapper">
                <img src={iconSearch} alt="search" className="search-icon"/>
                <input
                    className="search-input"
                    placeholder="Search for a place..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    autoComplete="off"
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map(s => (
                            <li
                                key={s.id || `${s.latitude},${s.longitude}`}
                                onClick={() => handleSelect(s)}
                                className="suggestion-item"
                            >
                                {s.name}{s.country ? `, ${s.country}` : ''}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="search-btn" onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default SearchBar;