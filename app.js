let RennesLat = 48.11;
let RennesLon = -1.67;
const key = "e9f2f24a-d8a8-44af-ac48-3b0918da2fa4";

async function fetchData() {
  try {
    const apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${RennesLat}&lon=${RennesLon}&key=${key}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error ' + response.status + ', ' + response.statusText);
    }

    const responseData = await response.json();
    console.log(responseData);

    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      iconId: responseData.data.current.weather.ic,
      temperature: responseData.data.current.weather.tp,
    };

    displayData(sortedData);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

const cityName = document.querySelector(".city");
const countryName = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const icon = document.querySelector(".icon");

function displayData(data) {
  cityName.textContent = data.city;
  countryName.textContent = data.country;
  temperature.textContent = `${data.temperature}°`;
  icon.src = "./Assets/" + data.iconId + ".png";
}