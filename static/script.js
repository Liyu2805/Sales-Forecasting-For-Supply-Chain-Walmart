document.getElementById("predictBtn").addEventListener("click", async () => {

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

    const sales = result.Predicted_Weekly_Sales;

    // Revenue card
    document.getElementById("revenue").innerText =
      "$" + sales.toLocaleString();

    // Units card (business assumption)
    const units = Math.round(sales / 25);
    document.getElementById("units").innerText =
      units.toLocaleString();

    // Stock risk logic
    let risk = "Low (1 item)";
    if (units > 20000) risk = "High (3 items)";
    else if (units > 10000) risk = "Medium (2 items)";

    document.getElementById("risk").innerText = risk;

  } catch (err) {
    alert("Prediction failed");
    console.error(err);
  }
});