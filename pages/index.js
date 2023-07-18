import React, { useState } from 'react';
import Layout from '../components/Layout';
import lookupTable from '../public/data/flavour_pairings.json';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pairings, setPairings] = useState(null);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const result = lookupTable.find(
      (item) => item.Flavour.toLowerCase() === searchTermLower
    );

    if (result) {
      setPairings(result);
    } else {
      setPairings(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 3) {
      const filteredSuggestions = lookupTable.filter((item) =>
        item.Flavour.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.Flavour);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Flavour Town!</h1>
        <h2 className="text-4xl mb-4">Search for your single key flavour here!</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. garlic, beef, chocolate..."
            className="px-4 py-2 border border-gray-300 rounded-md mb-4"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.Flavour}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.Flavour}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>

        {pairings && (
          <div>
            <h3>Wine Pairing: {pairings.Wine}</h3>
            <p>More information about this wine pairing: {pairings['Wine Description']}</p>
            <h3>Beer Pairing: {pairings.Beer}</h3>
            <p>More information about this beer pairing: {pairings['Beer Description']}</p>
            <h3>Soft Drink Pairing: {pairings['Soft Drink']}</h3>
            <p>More information about this soft drink pairing: {pairings['Soft Drink Description']}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;