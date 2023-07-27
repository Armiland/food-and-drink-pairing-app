import React, { useState } from 'react';
import Layout from '../components/Layout';
import lookupTable from '../public/data/flavour_pairings.json';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pairings, setPairings] = useState({});
  const [showWine, setShowWine] = useState(false);
  const [showBeer, setShowBeer] = useState(false);
  const [showSoftDrink, setShowSoftDrink] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const result = lookupTable.find(
      (item) => item.Flavour.toLowerCase() === searchTermLower
    );

    if (result) {
      setPairings(result);
    } else {
      setPairings({});
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 1) {
      const filteredSuggestions = lookupTable.filter((item) =>
        item.Flavour.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 10));
    } else {
      setSuggestions([]);
    }
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.Flavour);
    setSuggestions([]);
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        setSearchTerm(suggestions[selectedSuggestionIndex].Flavour);
        setSuggestions([]);
        handleSearch();
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Flavour Town!</h1>
        <h2 className="text-4xl mb-4">Search for your single key flavour here!</h2>
        <div className="relative flex">
          <input
            type="text"
            placeholder="e.g. garlic, beef, chocolate..."
            className="px-4 py-2 border border-gray-300 rounded-md mr-2"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.Flavour}
                  className={`px-4 py-2 cursor-pointer ${
                    index === selectedSuggestionIndex ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.Flavour}
                </li>
              ))}
            </ul>
          )}
        </div>
        {Object.keys(pairings).length > 0 && (
          <div className="max-w-2xl w-full mx-auto mt-4">
            {searchTerm && (
              <h3 className="text-lg font-bold mb-2 text-center">{searchTerm}</h3>
            )}
            {pairings.See && (
              <p className="italic mb-2 text-center">See: {pairings.See}.</p>
            )}
            {pairings.Wine && (
              <div className="mb-4">
                <h3
                  className="flex items-center cursor-pointer text-lg font-bold"
                  onClick={() => setShowWine(!showWine)}
                >
                  Your Wine Pairing
                  <svg
                    className={`ml-2 h-6 w-6 ${showWine ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h3>
                {showWine && (
                  <div className="border p-4 rounded-md bg-gray-100">
                    <p className="font-bold">{pairings.Wine}</p>
                    <p>{pairings['Wine Description']}</p>
                  </div>
                )}
              </div>
            )}
            {pairings.Beer && (
              <div className="mb-4">
                <h3
                  className="flex items-center cursor-pointer text-lg font-bold"
                  onClick={() => setShowBeer(!showBeer)}
                >
                  Your Beer Pairing
                  <svg
                    className={`ml-2 h-6 w-6 ${showBeer ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h3>
                {showBeer && (
                  <div className="border p-4 rounded-md bg-gray-100">
                    <p className="font-bold">{pairings.Beer}</p>
                    <p>{pairings['Beer Description']}</p>
                  </div>
                )}
              </div>
            )}
            {pairings['Soft Drink'] && (
              <div>
                <h3
                  className="flex items-center cursor-pointer text-lg font-bold"
                  onClick={() => setShowSoftDrink(!showSoftDrink)}
                >
                  Your Soft Drink Pairing
                  <svg
                    className={`ml-2 h-6 w-6 ${showSoftDrink ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h3>
                {showSoftDrink && (
                  <div className="border p-4 rounded-md bg-gray-100">
                    <p className="font-bold">{pairings['Soft Drink']}</p>
                    <p>{pairings['Soft Drink Description']}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
