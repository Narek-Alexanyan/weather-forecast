import axios from "axios";
import { ref, onMounted } from "vue";
import { usePreferredCitiesStore } from "../stores/preferredCities";

export default function useGeolocation() {
  const location = ref(null)
  const locationError = ref(null)
  const preferredCitiesStore = usePreferredCitiesStore()

  const handleError = (error) => {
    locationError.value = error.message || "Geolocation error";
  };

  const handleSuccess = async (position) => {
    const { latitude, longitude } = position.coords;

    location.value = { latitude, longitude };

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const city = response.data.address.city;

      location.value.city = city;
      preferredCitiesStore.addCity(city);
      preferredCitiesStore.selectCity(city);
    } catch (error) {
      handleError(error);
    }
  };

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      locationError.value = "Geolocation is not supported by this browser.";
    }
  })

  return { location, locationError }
}
