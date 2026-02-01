from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
from datetime import datetime
import os

app = Flask(__name__)

model = joblib.load("sales_model.joblib") 

@app.route('/')
def home():
    return render_template('index.html') 

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        date = datetime.strptime(data['Date'], "%Y-%m-%d")

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

        # Convert to DataFrame
        df = pd.DataFrame([input_data])

        # Predict
        prediction = model.predict(df)[0]
        prediction = max(0, prediction)

        # Return JSON
        return jsonify({
            'Predicted_Weekly_Sales': round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)