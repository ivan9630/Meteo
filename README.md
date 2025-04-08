
# 🌤️ Météo App (React Native + Expo)

Une application météo développée avec **React Native** et **Expo**, utilisant l'API [Open-Meteo](https://open-meteo.com) pour afficher la météo actuelle, les prévisions horaires et un fond dynamique selon les conditions météo.

---

## 🚀 Fonctionnalités

- 📍 Récupération automatique ou manuelle de la localisation
- ☁️ Température, ressenti, humidité, icône météo
- ⏱️ Prévisions horaires glissables sur 24h
- 🎨 Fond dynamique selon le `weather_code` (ciel, pluie, neige...)
- 🔍 Recherche de ville avec l’API de géocodage d'Open-Meteo
- 📱 UI inspirée de l'application iOS Météo

---

## 📦 Installation

```bash
git clone https://github.com/ivan9630/meteo-app.git
cd Meteo
npm install
npx expo start



📁 Structure

.
├── app/
│   ├── components/         # Composants UI (ex : WeatherCard)
│   ├── hooks/              # Hooks personnalisés (ex : useLocation)
│   ├── screens/            # Écrans principaux (HomeScreen)
│   ├── services/           # Services API (Open-Meteo, géocoding)
├── assets/
│   ├── weather-icons/      # Icônes météo (ensoleillé, pluie...)
│   ├── backgrounds/        # Fonds météo dynamiques


🛠️ Technologies
React Native

Expo

axios

expo-location

Open-Meteo API

TypeScript


📸 Aperçu
📷 Ajoute ici des captures d'écran plus tard :

 Écran principal

 Recherche de ville

 Prévision horaire glissable

 Fond météo dynamique

🙋‍♂️ Auteur
Développé par @ivan9630 – GitHub
