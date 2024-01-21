// Mes variables
const cityCoordinates = {
  'Rennes': { lat: 48.11, lon: -1.67 },
  'Saint-Malo': { lat: 48.65, lon: -2.01 },
  'Perros-Guirec': { lat: 48.81, lon: -3.45 },
  'Quiberon': {lat: 47.48, lon:-3.11},
  'Pornichet':{lat:47.26, lon:-2.33},
  'Saint-Pol-De-Léon':{lat: 51.02, lon:2.34},
  default: { lat: 48.11, lon: 2 },
};
const key = "e9f2f24a-d8a8-44af-ac48-3b0918da2fa4";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
let cityName = document.querySelector(".city");
let countryName = document.querySelector(".country");
let temperature = document.querySelector(".temperature");
let icon = document.querySelector(".icon");
let cityChoice = document.getElementsByTagName("li");
let selectedCity = "Rennes";
let lat;
let lon;

// Au chargement de la page, j'affiche la météo pour Rennes
document.addEventListener('DOMContentLoaded', function () {
  selectedCity = "Rennes";
  updateDisplay();
});

// J'affiche les prévisions en fonction de la ville choisie 
function showForecast(cityChoice) {
  selectedCity = cityChoice;
  updateDisplay();
}

// Je récupère les coordonnées de la ville sélectionnée
function getCityCoordinates() {
  const coordinates = cityCoordinates[selectedCity] || cityCoordinates.default;
  lat = coordinates.lat;
  lon = coordinates.lon;
}

// Je récupère les données depuis l'API AirVisual
async function fetchData() {
  getCityCoordinates();
  const apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${key}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await response.json();
  const sortedData = {
    city: responseData.data.city,
    country: responseData.data.country,
    iconId: responseData.data.current.weather.ic,
    temperature: responseData.data.current.weather.tp,
  };

  setData(sortedData);
}

// Je mets à jour mes données avec les infos récupérées via l'API
function setData(data) {
  cityName.textContent = data.city;
  countryName.textContent = data.country;
  temperature.textContent = `${data.temperature}°`;
  icon.src = "./Assets/" + data.iconId + ".png";
}

// Je mets à jour l'affichage en appelant fetchData
async function updateDisplay() {
  await fetchData();
}


// Au clic sur une autre ville, je mets à jour l'affichage
function displayForecast() {
  for (let city of cityChoice) {
    city.addEventListener('click', function (e) {
      showForecast(e.target.innerText);
    });
  }
}

// Je vérifie si les prévisions ont déjà été affichées 
let isForecastDisplayed = false;
if (!isForecastDisplayed) {
  displayForecast();
  isForecastDisplayed = true;
}