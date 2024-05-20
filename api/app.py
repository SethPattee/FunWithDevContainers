#!/usr/bin/env python
# encoding: utf-8
import json
import psycopg2
from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="postgres",
    host="fun_editor_postgres_db",
    port = "5432"
)
# conn = psycopg2.connect(
#     dbname="postgres",
#     user="postgres",
#     password="postgres",
#     host="localhost",  
#     port="5433"
# )
cur = conn.cursor()
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
# READ operation
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        cur.execute("SELECT * FROM weather_data;")
        rows = cur.fetchall()
        data = [{'id': row[0], 'date': str(row[1]), 'temperature': row[2], 'humidity': row[3], 'precipitation': row[4]} for row in rows]
        return jsonify(data)
    except psycopg2.Error as e:
        return jsonify({'error': str(e)}), 500

# CREATE operation
@app.route('/api/data', methods=['POST'])
def create_weather_data():
    try:
        data = request.get_json()
        date = data.get('date')
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        precipitation = data.get('precipitation')

        cur.execute("INSERT INTO weather_data (date, temperature, humidity, precipitation) VALUES (%s, %s, %s, %s);", (date, temperature, humidity, precipitation))
        conn.commit()

        return jsonify({'message': 'Weather data created successfully'}), 201
    except psycopg2.Error as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

# UPDATE operation
@app.route('/api/data/<int:id>', methods=['PUT'])
def update_weather_data(id):
    try:
        data = request.get_json()
        date = data.get('date')
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        precipitation = data.get('precipitation')
        print(data)
        print(date)
        print(temperature)
        print(humidity)
        print(precipitation)
        cur.execute("UPDATE weather_data SET date=%s, temperature=%s, humidity=%s, precipitation=%s WHERE id=%s;", (date, temperature, humidity, precipitation, id))
        conn.commit()

        return jsonify({'message': 'Weather data updated successfully'}), 200
    except psycopg2.Error as e:
        conn.rollback()
        error_message = str(e)
        print(f"Error updating weather data: {error_message}")
        return jsonify({'error': error_message}), 500

# DELETE operation
@app.route('/api/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    try:
        cur.execute("DELETE FROM weather_data WHERE id=%s;", (id,))
        conn.commit()

        return jsonify({'message': 'Data deleted successfully'}), 200
    except psycopg2.Error as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run()