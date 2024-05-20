-- Create a database named "weather_db"
CREATE DATABASE weather_db;


-- Create a table to store weather data
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    precipitation FLOAT NOT NULL
);

-- Insert sample data into the weather_data table
INSERT INTO weather_data (date, temperature, humidity, precipitation) VALUES 
    ('2024-05-01', 25.6, 60.2, 0.5),
    ('2024-05-02', 24.8, 62.5, 0.2),
    ('2024-05-03', 26.3, 58.9, 0.8),
    ('2024-05-04', 27.9, 55.1, 1.2),
    ('2024-05-05', 28.5, 51.6, 0.0),
    ('2024-05-06', 29.7, 49.8, 0.1),
    ('2024-05-07', 30.2, 48.3, 0.3),
    ('2024-05-08', 28.9, 53.2, 0.4),
    ('2024-05-09', 27.4, 57.8, 0.6),
    ('2024-05-10', 26.1, 61.4, 0.7);

