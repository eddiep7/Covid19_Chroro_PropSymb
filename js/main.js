mapboxgl.accessToken =
    'pk.eyJ1Ijoia2F0ZXNhZSIsImEiOiJjbHMxNDdnbHUwODdsMmpwNWliYzZzOGdjIn0.eK5A1j3I8VWSkpZhnBV9EA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 5, // starting zoom
    minZoom: 4, // minimum zoom level of the map
    center: [138, 38] // starting center
});
