from flask import Flask, request, jsonify
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Load trained model
model = joblib.load("sales_model.joblib")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json   # coming from frontend

    date = datetime.strptime(data['Date'].strip(), "%d-%m-%Y")

    input_data = {
        'Store': int(data['Store']),
        'Holiday_Flag': int(data['Holiday_Flag']),
        'Temperature': float(data['Temperature']),
        'Fuel_Price': float(data['Fuel_Price']),
        'CPI': float(data['CPI']),
        'Unemployment': float(data['Unemployment']),
        'Week': date.isocalendar().week,
        'Month': date.month,
        'Year': date.year
    }

    df = pd.DataFrame([input_data])

    prediction = model.predict(df)[0]

    return jsonify({
        'Predicted_Weekly_Sales': round(float(prediction), 2)
    })

if __name__ == "__main__":
    app.run(debug=True)