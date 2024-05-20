import { useState, useEffect } from 'react';
import './App.css';

interface IWeatherData {
  id: number;
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
}
const url = "http://172.22.0.5:5000/"
function App() {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newWeatherData, setNewWeatherData] = useState<{
    date: string;
    temperature: number;
    humidity: number;
    precipitation: number;
  }>({
    date: '',
    temperature: 0,
    humidity: 0,
    precipitation: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/data`);
      const jsonData = await response.json();
      setWeatherData(jsonData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch(`${url}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWeatherData),
      });
      fetchData();
      setNewWeatherData({
        date: '',
        temperature: 0,
        humidity: 0,
        precipitation: 0,
      }); // Clear input fields after creation
    } catch (error) {
      console.error('Error creating data:', error);
      setError('Failed to create data');
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<IWeatherData>) => {
    try {
      // Ensure that date, temperature, humidity, and precipitation are defined
      const fullData: IWeatherData = {
        id: id,
        date: updatedData.date || '', // Provide a default value or handle undefined
        temperature: updatedData.temperature || 0, // Provide a default value or handle undefined
        humidity: updatedData.humidity || 0, // Provide a default value or handle undefined
        precipitation: updatedData.precipitation || 0, // Provide a default value or handle undefined
      };

      await fetch(`${url}/api/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });
      fetchData(); // Refresh data after updating
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await fetch(`${url}/api/data/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete data');
    }
  };

  return (
    <>
      <h1>Weather Data CRUD</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="card">
        <input
          type="date"
          placeholder="Date"
          value={newWeatherData.date}
          onChange={(e) => setNewWeatherData({ ...newWeatherData, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Temperature"
          value={newWeatherData.temperature}
          onChange={(e) =>
            setNewWeatherData({ ...newWeatherData, temperature: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Humidity"
          value={newWeatherData.humidity}
          onChange={(e) =>
            setNewWeatherData({ ...newWeatherData, humidity: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Precipitation"
          value={newWeatherData.precipitation}
          onChange={(e) =>
            setNewWeatherData({ ...newWeatherData, precipitation: parseFloat(e.target.value) })
          }
        />
        <button onClick={handleCreate}>Create</button>
        <ul>
          {weatherData.map((item) => (
            <li key={item.id}>
              Date: {item.date} - Temperature: {item.temperature}°C - Humidity: {item.humidity}% - Precipitation: {item.precipitation}mm
              <button onClick={() => handleUpdate(item.id, {
                date: newWeatherData.date,
                temperature: newWeatherData.temperature,
                humidity: newWeatherData.humidity,
                precipitation: newWeatherData.precipitation,
              })}>
                Update
              </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

