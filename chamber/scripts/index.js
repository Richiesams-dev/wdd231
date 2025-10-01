// Set copyright year and last modified date
document.getElementById("copyright-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Member data for spotlights
const membersData = [
  {
    name: "Complete Computers And Technology Limited",
    address: "13, Adesuwa Girls Grammer School Road, Off Sapele Road, GRA Benin City, Nigeria",
    phone: "0803 353 5625",
    website: "https://cctechlimited.com",
    logo: "https://cctechlimited.com/images/CCT-logo.png",
    membership: "Gold",
    level: 3,
  },
  {
    name: "Home and Away Restaurant",
    address: "1 Ikpokpan Road, Off Sapele Road, GRA, Benin City, Nigeria",
    phone: "0803 980 4869",
    website: "https://homeandawayfoods.com",
    logo: "https://homeandawayfoods.com/Frontend/assets/img/logo/logo2.2.png",
    membership: "Silver",
    level: 2,
  },
  {
    name: "Ken E. Mozia & Co (SAN) Law Firm",
    address: "G.R.A, Plot 87 A Okoro - Otun Avenue, off Ikpokpan Road, Benin City, Nigeria",
    phone: "0703 361 9866",
    website: "https://www.facebook.com/Kenmoziasan",
    logo: "https://via.placeholder.com/100x100/1a4b84/FFFFFF?text=KEM", // Replaced problematic URL
    membership: "Silver",
    level: 2,
  },
  {
    name: "Benin Medical Care",
    address: "53 Adesuwa Grammar School Road, off Sapele Road, Benin City, Nigeria",
    phone: "0811 389 4440",
    website: "https://beninmedicalcare.com",
    logo: "https://beninmedicalcare.com/wp-content/uploads/2025/06/cropped-logo-scaled-1.png",
    membership: "Gold",
    level: 3,
  },
  {
    name: "Phil HallMark Supermarket",
    address: "107 Benin Sapele Rd, Oka, Benin City, Nigeria",
    phone: "0809 595 7574",
    website: "https://philhallmark.com",
    logo: "https://philhallmark.com/production/wp-content/uploads/2022/02/PH-PRIMARY-LOGO.png",
    membership: "Gold",
    level: 3,
  },
  {
    name: "Celebrity Fitness Gym",
    address: "1 Modupe Asemota Cl, Adesuwa Gram School Rd, Gra, Benin City, Nigeria",
    phone: "0810 729 4405",
    website: "https://www.instagram.com/celebrityfitnessng",
    logo: "https://via.placeholder.com/100x100/d4af37/1d3557?text=CFG", // Replaced problematic URL
    membership: "Silver",
    level: 2,
  },
  {
    name: "Access Bank",
    address: "81, Sapele Road, Benin City, Nigeria",
    phone: "07003000000",
    website: "https://www.accessbankplc.com",
    logo: "https://www.accessbankplc.com/Content/images/access-lg-logo.png",
    membership: "Gold",
    level: 3,
  }
];

// Function to display random spotlights
function displaySpotlights() {
  const container = document.getElementById("spotlightsContainer");
  container.innerHTML = "";

  // Filter gold and silver members (level 2 or 3)
  const eligibleMembers = membersData.filter((member) => member.level >= 2);

  // Randomly select 2-3 members
  const numSpotlights = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const selectedMembers = [];

  // Create a copy to avoid modifying original array
  const availableMembers = [...eligibleMembers];

  for (let i = 0; i < numSpotlights && availableMembers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableMembers.length);
    selectedMembers.push(availableMembers[randomIndex]);
    availableMembers.splice(randomIndex, 1);
  }

  // Create spotlight cards
  selectedMembers.forEach((member) => {
    const card = document.createElement("div");
    card.className = "spotlight-card";

    card.innerHTML = `
      <div class="spotlight-header">
        <img src="${member.logo}" alt="${member.name} Logo" class="spotlight-logo" 
             onerror="this.src='https://via.placeholder.com/100x100/1a4b84/FFFFFF?text=LOGO'">
        <div class="spotlight-name">${member.name}</div>
      </div>
      <div class="spotlight-details">
        <div class="spotlight-detail"><i class="fas fa-phone"></i> ${member.phone}</div>
        <div class="spotlight-detail"><i class="fas fa-map-marker-alt"></i> ${member.address}</div>
        <div class="spotlight-detail"><i class="fas fa-globe"></i> <a href="${member.website}" target="_blank">Visit Website</a></div>
        <span class="membership-level">${member.membership} Member</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
  const apiKey = '';
  const city = 'Benin City';
  const country = 'NG';
  
  // Use demo mode if no API key provided
  if (apiKey === '') {
    useSimulatedWeatherData();
    return;
  }
  
  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Weather data not available');
    }
    
    const currentData = await currentResponse.json();
    
    // Forecast (5-day, 3-hour intervals)
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${apiKey}`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Forecast data not available');
    }
    
    const forecastData = await forecastResponse.json();
    updateWeatherUI(currentData, forecastData);
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    useSimulatedWeatherData();
  }
}

// Function to update weather UI with real data
function updateWeatherUI(currentData, forecastData) {
  // Current weather
  document.querySelector(".weather-temp").textContent = `${Math.round(currentData.main.temp)}°F`;
  document.querySelector(".weather-desc").textContent = currentData.weather[0].description.charAt(0).toUpperCase() + currentData.weather[0].description.slice(1);
  
  // Weather icon
  const iconCode = currentData.weather[0].icon;
  const iconClass = getWeatherIconClass(iconCode);
  document.querySelector(".weather-icon").className = `fas ${iconClass} weather-icon`;

  // 3-day forecast with proper labels
  const forecastDays = getThreeDayForecast(forecastData);
  const forecastElements = document.querySelectorAll(".forecast-day");
  
  forecastElements.forEach((element, index) => {
    if (forecastDays[index]) {
      const day = forecastDays[index];
      element.querySelector(".forecast-date").textContent = day.date;
      element.querySelector(".forecast-temp").textContent = `${Math.round(day.temp)}°F`;
      const forecastIconClass = getWeatherIconClass(day.icon);
      element.querySelector("i").className = `fas ${forecastIconClass}`;
    }
  });
}

// Function to get proper day names for forecast
function getThreeDayForecast(forecastData) {
  const forecasts = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  // Get forecasts for next 3 days
  for (let i = 1; i <= 3; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const targetDayName = days[targetDate.getDay()];
    
    // Find forecast for around noon (12 PM) for each day
    const targetTime = new Date(targetDate);
    targetTime.setHours(12, 0, 0, 0);
    
    // Find the closest forecast to noon
    let closestForecast = null;
    let smallestDiff = Infinity;
    
    forecastData.list.forEach(item => {
      const itemTime = new Date(item.dt * 1000);
      const timeDiff = Math.abs(itemTime - targetTime);
      
      if (timeDiff < smallestDiff) {
        smallestDiff = timeDiff;
        closestForecast = item;
      }
    });
    
    if (closestForecast) {
      forecasts.push({
        date: targetDayName,
        temp: closestForecast.main.temp,
        icon: closestForecast.weather[0].icon
      });
    }
  }
  
  return forecasts;
}

// Weather icon mapping
function getWeatherIconClass(iconCode) {
  const iconMap = {
    '01d': 'fa-sun', '01n': 'fa-moon',
    '02d': 'fa-cloud-sun', '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud', '03n': 'fa-cloud',
    '04d': 'fa-cloud', '04n': 'fa-cloud',
    '09d': 'fa-cloud-rain', '09n': 'fa-cloud-rain',
    '10d': 'fa-cloud-sun-rain', '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-bolt', '11n': 'fa-bolt',
    '13d': 'fa-snowflake', '13n': 'fa-snowflake',
    '50d': 'fa-smog', '50n': 'fa-smog'
  };
  
  return iconMap[iconCode] || 'fa-cloud';
}

// Fallback function for simulated weather data
function useSimulatedWeatherData() {
  console.log("Using simulated weather data");
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const weatherData = {
    current: {
      temp: 82,
      description: "Sunny",
      icon: "fa-sun"
    },
    forecast: [
      { 
        date: days[(today.getDay() + 1) % 7], 
        temp: 84, 
        icon: "fa-cloud-sun" 
      },
      { 
        date: days[(today.getDay() + 2) % 7], 
        temp: 80, 
        icon: "fa-cloud" 
      },
      { 
        date: days[(today.getDay() + 3) % 7], 
        temp: 78, 
        icon: "fa-cloud-showers-heavy" 
      }
    ]
  };

  document.querySelector(".weather-temp").textContent = `${weatherData.current.temp}°F`;
  document.querySelector(".weather-desc").textContent = weatherData.current.description;
  document.querySelector(".weather-icon").className = `fas ${weatherData.current.icon} weather-icon`;

  const forecastElements = document.querySelectorAll(".forecast-day");
  forecastElements.forEach((element, index) => {
    if (weatherData.forecast[index]) {
      element.querySelector(".forecast-date").textContent = weatherData.forecast[index].date;
      element.querySelector(".forecast-temp").textContent = `${weatherData.forecast[index].temp}°F`;
      element.querySelector("i").className = `fas ${weatherData.forecast[index].icon}`;
    }
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  displaySpotlights();
  fetchWeatherData();
});