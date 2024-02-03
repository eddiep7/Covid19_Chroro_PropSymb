mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-98, 38],
    zoom: 3
});

map.on('load', () => {
    map.addSource('covidData', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.geojson'
    });

    map.addLayer({
        'id': 'covidData-point',
        'type': 'circle',
        'source': 'covidData',
        'paint': {
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [100, 5],
                    [1000, 10],
                    [5000, 15],
                    [10000, 20]
                ]
            },
            'circle-color': '#F28F3B', // Orange color
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.7
        }
    });

    const legend = document.getElementById('legend');
    const labels = ['<strong>Size</strong>'];
    const sizes = [5, 10, 15, 20];

    for (let i = 0; i < sizes.length; i++) {
        labels.push(
            `<p class="break">
                <i class="dot" style="background: #F28F3B; width: ${sizes[i]}px; height: ${sizes[i]}px;"></i>
                <span class="dot-label">${sizes[i]}</span>
            </p>`
        );
    }

    const source =
        '<p style="text-align: right; font-size:10pt">Source: <a href="YOUR_DATA_SOURCE_LINK">Your Data Source</a></p>';

    legend.innerHTML = labels.join('') + source;

    map.on('click', 'covidData-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
            .addTo(map);
    });
});
