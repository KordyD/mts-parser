import { useEffect, useState } from 'react';
import styles from './App.module.css';

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
    <div className={styles.wrapper}>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <div className={styles.wrapper__cards}>
          {tariffs.map((item) => (
            <div key={item._id} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul style={{ listStyle: 'none' }}>
                {item.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{item.price}</p>
              <p>{item.benefits}</p>
            </div>
          ))}
        </div>
      )}
      <button className={styles.button__parse} onClick={handleClick}>
        Парсить!
      </button>
    </div>
  );
}

export default App;
