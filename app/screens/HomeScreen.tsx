import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { fetchWeatherData } from '../services/weatherService';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native';
import axios from 'axios';

const backgroundImages: { [key: number]: any } = {
    0: require('../../assets/backgrounds/clear_sky.png'),   
    1: require('../../assets/backgrounds/cloudy.png'),
    2: require('../../assets/backgrounds/cloudy.png'),
    3: require('../../assets/backgrounds/cloudy.png'),
    45: require('../../assets/backgrounds/fog.png'),
    48: require('../../assets/backgrounds/fog.png'),
    51: require('../../assets/backgrounds/rain.png'),
    61: require('../../assets/backgrounds/rain.png'),
    66: require('../../assets/backgrounds/rain.png'),
    71: require('../../assets/backgrounds/snow.png'),
    75: require('../../assets/backgrounds/snow.png'),
    95: require('../../assets/backgrounds/storm.png'),
    96: require('../../assets/backgrounds/storm.png'),
    99: require('../../assets/backgrounds/storm.png'),
  };
  

const weatherIcons: { [key: number]: any } = {
    0: require('../../assets/weather-icons/clear_sky.png'),
  
    1: require('../../assets/weather-icons/mainly_clear.png'),
    2: require('../../assets/weather-icons/mainly_clear.png'),
    3: require('../../assets/weather-icons/mainly_clear.png'),
  
    45: require('../../assets/weather-icons/fog.png'),
    48: require('../../assets/weather-icons/fog.png'),
  
    51: require('../../assets/weather-icons/drizzle.png'),
    53: require('../../assets/weather-icons/drizzle.png'),
    55: require('../../assets/weather-icons/drizzle.png'),
  
    56: require('../../assets/weather-icons/drizzle.png'),
    57: require('../../assets/weather-icons/drizzle.png'),
  
    61: require('../../assets/weather-icons/rain.png'),
    63: require('../../assets/weather-icons/rain.png'),
    65: require('../../assets/weather-icons/rain.png'),
  
    66: require('../../assets/weather-icons/rain.png'),
    67: require('../../assets/weather-icons/rain.png'),
  
    71: require('../../assets/weather-icons/snow.png'),
    73: require('../../assets/weather-icons/snow.png'),
    75: require('../../assets/weather-icons/snow.png'),
  
    77: require('../../assets/weather-icons/snow.png'),
  
    80: require('../../assets/weather-icons/rain.png'),
    81: require('../../assets/weather-icons/rain.png'),
    82: require('../../assets/weather-icons/rain.png'),
  
    85: require('../../assets/weather-icons/snow.png'),
    86: require('../../assets/weather-icons/snow.png'),
  
    95: require('../../assets/weather-icons/thunderstorm.png'),
    96: require('../../assets/weather-icons/thunderstorm_hail.png'),
    99: require('../../assets/weather-icons/thunderstorm_hail.png'),
  };
  
  

const HomeScreen = () => {
  const { location, errorMsg } = useLocation();
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('');

  <TextInput
  value={city}
  onChangeText={setCity}
  placeholder="Entrez une ville"
  placeholderTextColor="#ccc"
  onSubmitEditing={() => searchCity(city)}
  style={{
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
    fontSize: 16,
  }}
/>



  useEffect(() => {
    if (location) {
      fetchWeatherData(location.coords.latitude, location.coords.longitude)
        .then(setWeather)
        .catch(console.error);
    }
  }, [location]);

  const searchCity = async (cityName: string) => {
    try {
      const geoResp = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`);
      if (geoResp.data.results && geoResp.data.results.length > 0) {
        const loc = geoResp.data.results[0];
        fetchWeatherData(loc.latitude, loc.longitude).then(setWeather);
      } else {
        alert("Lieu introuvable.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la recherche du lieu.");
    }
  };
  

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!weather || !weather.current) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  const weatherCode = weather?.current?.weather_code ?? 0;
  const background = backgroundImages[weatherCode] || backgroundImages[0]; 
  const current = weather.current;
  const hourly = weather.hourly;
  const hourlyItems = weather.hourly.time.map((time: string, index: number) => ({
    time: time.slice(11, 16), // HH:mm
    temp: Math.round(weather.hourly.temperature_2m[index]),
    code: weather.hourly.weather_code[index],
  }));

  return (

    <ImageBackground
    source={background}
    style={{ flex: 1 }}
    resizeMode="cover"
    >
    
    <View style={styles.container}>
      <Text style={styles.temp}>{current.temperature_2m}°C</Text>
      <Text>Ressenti : {current.apparent_temperature}°C</Text>
      <Text>Humidité : {current.relative_humidity_2m}%</Text>
      <Image source={weatherIcons[current.weather_code]} style={styles.icon} />

      <FlatList
  data={hourlyItems}
  horizontal
  keyExtractor={(_, i) => i.toString()}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 16 }}
  renderItem={({ item }) => (
    <View style={styles.hourlyBlock}>
      <Text style={styles.hourText}>{item.time}</Text>
      <Image
        source={weatherIcons[item.code] || weatherIcons[0]}
        style={styles.hourIcon}
      />
      <Text style={styles.tempText}>{item.temp}°</Text>
    </View>

  )}
/>

    </View>
    </ImageBackground>
  );
};



export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  hourBlock: {
    alignItems: 'center',
  marginHorizontal: 8,
  backgroundColor: '#eee',
  borderRadius: 12,
  padding: 8,
  },
  iconSmall: {
    width: 40,
    height: 40,
  },
  hourlyBlock: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 10,
    width: 60,
  },
  hourText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  hourIcon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  tempText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  
});
