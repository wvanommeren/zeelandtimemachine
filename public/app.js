// MapLibre GL JS implementatie
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json', // Vrij beschikbare basiskaart
  center: [3.9, 51.5], // Zeeland
  zoom: 8,
  maxZoom: 15
});
// Voeg navigatieknoppen toe (in/uitzoomen, draaien)
map.addControl(new maplibregl.NavigationControl(), 'top-right');

// Voeg een info-knop toe
class InfoControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'ℹ️';
    button.title = 'Over Zeeland Time Machine';
    button.onclick = () => {
      alert('Zeeland Time Machine\n\nDelta Archieven viewer met LOD (Level of Detail) en open kaartlagen.');
    };
    this._container.appendChild(button);
    return this._container;
  }
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
map.addControl(new InfoControl(), 'top-right');

const lodInfo = document.getElementById('lod-info');

function updateLOD(zoom) {
  let lod = '';
  if (zoom < 9) {
    lod = 'LOD 1: Provincie-overzicht';
  } else if (zoom < 12) {
    lod = 'LOD 2: Gemeente-niveau';
  } else {
    lod = 'LOD 3: Straatniveau';
  }
  lodInfo.textContent = lod;
}

map.on('zoom', () => {
  updateLOD(map.getZoom());
});

map.on('load', () => {
  updateLOD(map.getZoom());
  // Gebruik een alternatieve open tile-provider, zoals CartoDB Positron
  map.addSource('carto-positron', {
    type: 'raster',
    tiles: [
      'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    ],
    tileSize: 256,
    attribution: '© OpenStreetMap contributors, © CARTO'
  });
  map.addLayer({
    id: 'carto-positron',
    type: 'raster',
    source: 'carto-positron',
    minzoom: 0,
    maxzoom: 19
  });
});
