🛒 Walmart Sales Forecasting for Supply Chain (Machine Learning)

📌 Project Overview
This project is an end-to-end Sales Forecasting web application built using Machine Learning and Flask.
It predicts weekly sales revenue for Walmart stores based on historical sales patterns, economic indicators, and time-based seasonality.
The system helps demonstrate how predictive analytics can support supply chain planning, demand estimation, and business decision-making.

🎯 Problem Statement
Accurate sales forecasting is critical for:
Inventory management
Supply chain optimization
Reducing stock-out and overstock situations
This project aims to forecast weekly sales for a given Walmart store using machine learning models trained on real-world data.

🧠 Machine Learning Approach
Dataset
Walmart Sales Dataset (historical weekly sales)
Includes economic and store-level features
Target Variable
Copy code

Weekly_Sales
Features Used
Copy code
Text
Store
Holiday_Flag
Temperature
Fuel_Price
CPI
Unemployment
Week
Month
Year
These features capture:
Store-specific demand patterns
Holiday effects
Economic conditions
Seasonal trends

🤖 Models Tried :
Model
Accuracy / Performance
Linear Regression
~47%
Random Forest Regressor
~82%
ARIMA
~87%
✅ Final Model Used: ARIMA Time Series

🌐 Web Application Architecture
Backend
Flask (REST API)
Joblib for model loading
Accepts JSON input and returns predictions
Frontend
HTML, CSS, JavaScript
Discord-inspired dark UI
User inputs store details and date
Prediction cards appear dynamically after inference

⚙️ How the Prediction Works
User enters inputs (store, date, economic factors)
Frontend sends data to Flask /predict API
Date is converted into Week, Month, Year
Model predicts Weekly Sales
Result is displayed on the dashboard

📊 Output
Predicted Weekly Sales (Revenue)
Forecasted units (derived)
Model accuracy (static display)
Stock-out risk indicator (demo metric)

🛠️ Tech Stack
Python
Pandas, NumPy
Scikit-learn
Flask
HTML, CSS, JavaScript
Joblib

🚀 How to Run Locally
Copy code
Bash
pip install -r requirements.txt
python app.py

Then open:

Copy code

http://127.0.0.1:5002

Deploy on cloud (Railway)

👩‍💻 Author
Liyutsa
Machine Learning Data Science Enthusiast