import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "./styles/App.css";

function App() {
  const [jsonData, setJsonData] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const options = [
    { value: 'characters', label: 'Characters' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      setErrorMessage('');
      const response = await axios.post('http://127.0.0.1:5000/bfhl', jsonData);
      setResponseData(response.data);
    } catch (error) {
      setErrorMessage('Invalid JSON or error processing the request');
    }
  };

  const handleInputChange = (e) => {
    try {
      setJsonData(JSON.parse(e.target.value));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid JSON format');
    }
  };

  return (
    <>
    <div className="App">
    <h1>Bajaj App</h1>
      <input
        type="text"
        placeholder="Enter JSON data"
        onChange={handleInputChange}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {responseData && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            style={{ marginTop: '20px', width: '300px' }}
          />

          <div style={{ marginTop: '20px' }}>
            {selectedOptions.some(option => option.value === 'characters') && (
              <div>
                <h3>Characters</h3>
                <pre>{JSON.stringify(responseData.alphabets, null, 2)}</pre>
              </div>
            )}

            {selectedOptions.some(option => option.value === 'numbers') && (
              <div>
                <h3>Numbers</h3>
                <pre>{JSON.stringify(responseData.numbers, null, 2)}</pre>
              </div>
            )}

            {selectedOptions.some(option => option.value === 'highest_alphabet') && (
              <div>
                <h3>Highest Alphabet</h3>
                <pre>{JSON.stringify(responseData.highest_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
