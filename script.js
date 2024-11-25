async function fetchTemperature() {
    const displayElement = document.getElementById('temperature');
    try {
      const response = await fetch('http://192.168.56.1:3001/getTemperature');//http://localhost:3001/updateTemperature
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const temperature = data.temperature;
  
      displayElement.textContent = temperature !== null
        ? `Current Temperature: ${temperature}°C`
        : "No temperature data available.";
    } catch (error) {
      console.error('Error fetching temperature:', error);
      displayElement.textContent = "Failed to fetch temperature data.";
    }
  }
  
  setInterval(fetchTemperature, 5000);
  window.onload = fetchTemperature;