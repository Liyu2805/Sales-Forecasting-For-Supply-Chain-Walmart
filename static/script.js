document.getElementById("predictBtn").addEventListener("click", async () => {
  // Removed e.preventDefault() because it was causing an error and isn't needed for type="button"

  const data = {
    Store: document.getElementById("store").value,
    Holiday_Flag: document.getElementById("holiday").checked ? 1 : 0,
    Temperature: document.getElementById("temperature").value,
    Fuel_Price: document.getElementById("fuel").value,
    CPI: document.getElementById("cpi").value,
    Unemployment: document.getElementById("unemployment").value,
    Date: document.getElementById("date").value
  };

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.error) {
      alert("Error: " + result.error);
      return;
    }

    const sales = result.Predicted_Weekly_Sales;

    // 1. Show the hidden cards container
    document.getElementById("cards-container").classList.add("show");

    // 2. Update Revenue card (Matched to HTML ID: predicted-revenue)
    document.getElementById("predicted-revenue").innerText =
      "$" + sales.toLocaleString();

    // 3. Units card (Matched to HTML ID: forecasted-units)
    const units = Math.round(sales / 25);
    document.getElementById("forecasted-units").innerText =
      units.toLocaleString();

    // 4. Stock risk logic (Matched to HTML ID: stock-risk)
    let risk = "Low (1 item)";
    if (units > 20000) risk = "High (3 items)";
    else if (units > 10000) risk = "Medium (2 items)";

    document.getElementById("stock-risk").innerText = risk;

  } catch (err) {
    alert("Prediction failed. Make sure your Flask server is running!");
    console.error(err);
  }
});
