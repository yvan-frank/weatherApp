import axios from "axios";

const apiKey = 'a2139e7ad51b415dbc3230314231310';

const forecastEndpoint = (params) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationEndpoint = (params) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

const apiCall = async (endpoint) => {
  const options = {
	  methode: 'GET',
	  url: endpoint
  }
  
  try {
	  const response = await axios.request(options);
	  return response.data;
  }catch (e) {
	  console.log('Error ==>', e)
	  return null;
  }
}

export const fetchWeatherForecast = params => {
	return apiCall(forecastEndpoint(params));
}

export const fetchLocations = params => {
	return apiCall(locationEndpoint(params));
}
