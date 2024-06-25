<template>
  <q-card class="weather-card">
    <q-card-section class="search-section">
      <div class="text-h5 text-white">Cari Lokasi</div>
      <q-input filled v-model="searchLocation" label="Masukkan lokasi" dense color="white" text-color="white"
        class="search-input" @keyup.enter="fetchWeatherData" />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </q-card-section>

    <q-card-section v-if="location" class="info-section">
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Jam</div>
          <div class="info-value info-box">
            <q-icon name="access_time" size="md" class="current-time-icon" />
            {{ currentTime }}
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">Lokasi</div>
          <div class="info-value info-box">
            <q-icon name="location_on" size="md" class="location-icon" />
            {{ location }}
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">Cuaca</div>
          <div class="info-value info-box">
            <div class="weather-details">
              <img :src="weatherIconUrl" alt="Ikon Cuaca" class="weather-icon" />
              <div class="weather-description">{{ description }}</div>
            </div>
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">Suhu</div>
          <div class="info-value info-box">
            <div class="temperature-details">
              <q-icon name="thermostat" size="md" class="temperature-icon" />
              <div class="temperature">{{ temperature }}°C</div>
            </div>
            <q-linear-progress v-if="location" :value="progress" color="primary" height="4px"
              class="temperature-progress" />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cari" color="primary" @click="fetchWeatherData" />
    </q-card-actions>
  </q-card>
</template>


<script>
import axios from 'axios';
import { QIcon } from 'quasar';

export default {
  name: 'WeatherCard',
  components: {
    QIcon,
  },
  data() {
    return {
      location: '',
      searchLocation: '',
      description: '',
      temperature: 0,
      progress: 0,
      weatherIconUrl: '',
      apiKey: '2354966c4ecab3d7290827405bc6af8a',
      timeZoneApiKey: 'OBSQZ8RJM4DE',
      errorMessage: '',
      currentTime: '',
      timeZone: '',
    };
  },
  methods: {
    async fetchWeatherData() {
      const loc = this.searchLocation.trim();
      if (!loc) return;

      this.errorMessage = '';
      this.location = '';

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${this.apiKey}&units=metric`
        );
        const data = response.data;
        this.location = loc;
        this.description = data.weather[0].description;
        this.temperature = data.main.temp;
        this.progress = (data.main.temp / 40) * 100;
        this.weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        this.updateTime();

        // Call TimeZoneDB API to get timezone
        const timeZoneResponse = await axios.get(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=${this.timeZoneApiKey}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`
        );
        this.timeZone = timeZoneResponse.data.zoneName;

      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Lokasi tidak ditemukan. Silakan masukkan lokasi yang valid.';
        } else {
          this.errorMessage = 'Terjadi kesalahan saat mengambil data cuaca.';
        }
        console.error('Error fetching weather data:', error.response || error.message || error);
      }
    },
    updateTime() {
      const now = new Date();
      const timeZone = this.timeZone;
      const options = {
        hour12: false,
        timeZone: timeZone
      };
      try {
        this.currentTime = now.toLocaleTimeString('id-ID', options);
      } catch (error) {
        console.error('Invalid time zone specified:', error);
        this.currentTime = '00:00';
      }
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 500);
  }
};
</script>



<style scoped>
.weather-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(60deg, #22b3ed, #cac9ce);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: -30px;
}

.text-h5 {
  font-size: 1.25rem;
  font-weight: bold;
}

.text-primary {
  color: #42a5f5;
}

.error-message {
  color: #e53935;
  margin-top: 8px;
}

.search-section {
  text-align: center;
}

.search-input {
  max-width: 300px;
  margin: auto;
}

.info-section {
  display: flex;
  justify-content: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-weight: bold;
}

.info-value {
  display: flex;
  align-items: center;
}

.info-box {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 8px;
}

.current-time-icon {
  margin-right: 8px;
}

.location-icon {
  margin-right: 10px;
  color: #fbc531;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.weather-description {
  font-size: 1.25rem;
}

.temperature-details {
  display: flex;
  align-items: center;
}

.temperature-icon {
  margin-right: 10px;
  color: #fbc531;
}

.temperature {
  font-size: 2rem;
  font-weight: bold;
}

.location-icon {
  color: #fbc531;
}
</style>