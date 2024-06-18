import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const API_KEY = '0f9642540fmshe374b05b9e38e71p13ce70jsna39683c0b53e'; // Replace with your actual API key

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          },
          params: {
            namePrefix: value,
            limit: 10,
          },
        });

        const cities = response.data.data.map(city => city.city);
        setFilteredCities(cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      setFilteredCities([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    setFilteredCities([]);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search cities..."
      />
      {filteredCities.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
