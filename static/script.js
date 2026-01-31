const form = document.getElementById('predict-form');
const cardsContainer = document.getElementById('cards-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    Store: parseInt(form.Store.value),
    Holiday_Flag: form.Holiday_Flag.checked ? 1 : 0,
    Temperature: parseFloat(form.Temperature.value),
    Fuel_Price: parseFloat(form.Fuel_Price.value),
    CPI: parseFloat(form.CPI.value),
    Unemployment: parseFloat(form.Unemployment.value),
    Date: form.Date.value
  };

  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Update cards
    document.getElementById('predicted-revenue').textContent = `$${result.Predicted_Weekly_Sales}`;
    document.getElementById('forecasted-units').textContent = Math.round(result.Predicted_Weekly_Sales / 50);
    document.getElementById('stock-risk').textContent = "3 Items"; // optional logic

    // Show cards
    cardsContainer.classList.add('show');

  } catch (error) {
    console.error('Error:', error);
    alert('Prediction failed. Check console.');
  }
});