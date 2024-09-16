import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue,setInputValue] = useState(null);
  const [tableData,SetTablleData] = useState([]);
  
  const apiUrl ='https://localhost:7212/api/FileMetaData/filePath';

  useEffect(() => {
      fetchData('');
  },[]);

  const fetchData = async (path) => {
    try {
      const response = await axios.get(apiUrl, {
        params:{path}
      });
      SetTablleData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const FileSubmit = async (event) => {
    event.preventDefault();

    if(inputValue.trim()){
      try {
       await fetchData(inputValue);
        setInputValue('');
      } catch (error) {
        console.error('Error Submitting data:', error);
      }
        // SetTablleData([...tableData, inputValue]);
        // setInputValue('');
    }
};
const handleInputChange = (event) =>{
 setInputValue(event.target.value);
};
return ( <div className="App">
  <h1>Data Binding Example with Files</h1>
<form onSubmit={FileSubmit}>
<input type="text" value={inputValue} onChange={handleInputChange}></input>
<button type="submit">Submit</button>
</form>
{tableData.length > 0 && (
<table border="1" style={{marginTop: '20px'}}>
  <thead>
  <tr>
              <th>File Name</th>
              <th>File Extension</th>
              <th>Size of File</th>
              <th>Creation Time</th>
            </tr>
  </thead>
  <tbody>
  {tableData.map((file, index) => (
              <tr key={index}>
                <td>{file.fileName}</td>
                <td>{file.fileExtension}</td>
                <td>{file.sizeofFile}</td>
                <td>{file.creationTime}</td>
              </tr>
            ))}
  </tbody>
</table>
)}
</div> );
}


export default App;
