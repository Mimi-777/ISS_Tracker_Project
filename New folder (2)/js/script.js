
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);

async function fetchISSLocation() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        const { latitude, longitude } = data.iss_position;
        updateMap(latitude, longitude);
    } catch (error) {
        console.error('Error fetching ISS location:', error);
    }
}

function updateMap(lat, lon) {
    marker.setLatLng([lat, lon]);
    map.setView([lat, lon], 4);
    document.getElementById('coordinates').textContent = `Latitude: ${lat}, Longitude: ${lon}`;
}

document.getElementById('refresh-btn').addEventListener('click', fetchISSLocation);

// Automatically fetch location on load
fetchISSLocation();
// Refresh location every 5 seconds
setInterval(fetchISSLocation, 5000);
