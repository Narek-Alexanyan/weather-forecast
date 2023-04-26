import { ref } from 'vue';
import axios from 'axios';
import { format } from 'date-fns';
import { WEATHER_API_KEY, WEATHER_API_URL } from '@/config.js'

// Handle errors for API key and API URL imports
if (!WEATHER_API_KEY) {
  throw new Error('Weather API key not found.');
}

if (!WEATHER_API_URL) {
  throw new Error('Weather API URL not found.');
}


const useWeatherData = () => {
  const currentTemp = ref(0);
  const currentIcon = ref('');
  const dailyForecast = ref([]);
  const hourlyForecast = ref([]);

  const formatDailyForecast = (list) => {
    return list.filter((_, index) => index % 8 === 0).map(item => {
      const { main: { temp: dailyTemp }, weather: [{ icon: dailyIcon }] } = item;
      const dailyIconUrl = `https://openweathermap.org/img/wn/${dailyIcon}.png`;
      const dailyDate = new Date(item.dt_txt);
      return {
        temp: Math.round(dailyTemp),
        iconUrl: dailyIconUrl,
        date: format(dailyDate, 'EEE')
      }
    })
  }

  const formatHourlyForecast = (list) => {
    return list.map(item => {
      const { main: { temp: hourlyTemp }, weather: [{ icon: hourlyIcon }] } = item;
      const hourlyIconUrl = `https://openweathermap.org/img/wn/${hourlyIcon}.png`;
      const hourlyMeridiem = new Date(item.dt_txt);
      const hourlyDate = new Date(item.dt_txt);
      return {
        temp: Math.round(hourlyTemp),
        iconUrl: hourlyIconUrl,
        meridiem: format(hourlyMeridiem, 'ha'),
        date: format(hourlyDate, 'EEE')
      }
    })
  }

  const fetchWeatherData = async (city) => {
    // Parameters for the API request
    const params = {
      q: city,
      appid: WEATHER_API_KEY,
      units: 'metric'
    };

    try {
      const { data: { list } } = await axios.get(WEATHER_API_URL, { params });
      dailyForecast.value = formatDailyForecast(list);
      hourlyForecast.value = formatHourlyForecast(list);
      currentTemp.value = Math.round(list[0].main.temp);
      currentIcon.value = list[0].weather[0].icon;
    } catch (error) {
      console.error(error);
    }
  }

  return { currentTemp, currentIcon, dailyForecast, hourlyForecast, fetchWeatherData };
}


export default useWeatherData;