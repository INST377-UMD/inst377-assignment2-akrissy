const API_KEY = 'SnfWM1y54aNSYxQGEunLU9xh3tCztuyCY';

async function loadStockData() {
    const ticker = document.getElementById("ticker").value.toUpperCase();
    const days = parseInt(document.getElementById("days").value);
  
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
  
    const from = start.toISOString().split('T')[0];
    const to = end.toISOString().split('T')[0];
  
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (!data.results || data.results.length === 0) {
        alert(`No data found for ${ticker}.`);
        return;
      }
  
      const labels = data.results.map(day => new Date(day.t).toLocaleDateString());
      const values = data.results.map(day => day.c);
  
      new Chart(document.getElementById("stockChart"), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true
        }
      });
    } catch (err) {
      console.error(err);
      alert("Error loading stock data. Check your API key and ticker.");
    }
  }  

async function loadRedditStocks() {
  const res = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
  const data = await res.json();
  const top5 = data.slice(0, 5);

  const tbody = document.getElementById("redditStocks");
  top5.forEach(stock => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
      <td>${stock.no_of_comments}</td>
      <td>${stock.sentiment.toLowerCase() === 'bullish' ? '📈' : '📉'}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRedditStocks();

  if (annyang) {
    annyang.addCommands({
      'lookup *stock': (stock) => {
        document.getElementById("ticker").value = stock.toUpperCase();
        document.getElementById("days").value = "30";
        loadStockData();
      }
    });
  }
});
