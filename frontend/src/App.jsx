import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch('http://localhost:3001/api/tariffs');
    const data = await response.json();
    return data;
  };
  const parseData = async () => {
    const response = await fetch('http://localhost:3001/api/tariffs', {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  };

  const handleClick = () => {
    setLoading(true);
    console.log(loading);
    parseData().then((data) => {
      setTariffs(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      setTariffs(data);
      setLoading(false);
    });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        tariffs.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.features.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{item.price}</p>
            <p>{item.benefits}</p>
          </div>
        ))
      )}
      <button onClick={handleClick}>Парсить!</button>
    </>
  );
}

export default App;
