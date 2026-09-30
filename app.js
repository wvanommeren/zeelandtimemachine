import maplibregl from 'maplibre-gl';
import { RasterControl } from 'maplibre-gl-raster';
import { BasemapControl } from 'maplibre-gl-basemap-control';

const historischKaarten = [
  {
    jaar: 1960,
    naam: "1960 - historische kaart 1",
    tileUrl: "data/PXL_20260623_070411125_aangepast_COG.tif"
  },
  {
    jaar: 1961,
    naam: "1961 - historische kaart 2",
    tileUrl: "data/PXL_20260623_070508027_aangepast_COG.tif"
  },
  {
    jaar: 1970,
    naam: "1970 - historische kaart 3",
    tileUrl: "data/PXL_20260623_070411125_aangepast_COG.tif"
  },
  {
    jaar: 1970,
    naam: "1970 - historische kaart 4",
    tileUrl: "data/PXL_20260623_070508027_aangepast_COG.tif"
  }

];

const historischMarkers = [
  {
    jaar:1961,
    naam: "1961 - historische marker 1",
    coordinates: [3.9, 51.5] ,
    image_path: "data/6fafd293-ec92-3e91-9417-600192b78d62.jpg"

  },
  {
    jaar:1961,
    naam: "1961 - historische marker 2",
    coordinates: [3.9, 51.5] ,
    image_path: "data/Deltawerke-Oosterschelde-Sturmflutwehr_Straße.jpg"

  },
  {
    jaar:1962,
    naam: "1962 - historische marker 3",
    coordinates: [3.9, 51.5] ,
    image_path: "data/Veerse Gatdam - deltawerk Veerse Gatdam.jpg"

  }
];


// MapLibre GL JS implementatie
const map = new maplibregl.Map({
  container: 'interactive-map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256
      },
      luchtfoto: {
        type: "raster",
        tiles: [
          "https://service.pdok.nl/hwh/luchtfotorgb/wms/v1_0?service=WMS&request=GetMap&version=1.1.1&layers=Actueel_orthoHR&styles=&format=image/png&transparent=true&srs=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}"
        ],
        tileSize: 256
      }
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm"
      },
      {
        id: 'luchtfoto',
        type: 'raster',
        source: 'luchtfoto',
        layout: {
          visibility: 'none'
        },
        paint: {}
      }]


  },
  center: [3.9, 51.5], // Zeeland
  zoom: 9,
  maxZoom: 20
});
// Voeg navigatieknoppen toe (in/uitzoomen, draaien)
map.addControl(new maplibregl.NavigationControl(), 'top-right');
const rasterControl = new RasterControl({ 
  title: 'Historische kaarten',
  collapsed: false,
  position: 'bottom-right',
  closeOnOutsideClick: false,
  panelWidth: 200,

});
map.addControl(rasterControl, 'top-right');



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

const yearSlider = document.getElementById('year-slider');
const yearValue = document.getElementById('year-value');
const archiveSearch = document.getElementById('archive-search');
const archiveList = document.getElementById('archive-list');

// Kaarten kunnen een optioneel `thumbnail` krijgen; TIFF's zelf zijn geen browserafbeelding.
const archiefItems = [
  ...historischKaarten.map(kaart => ({ type: 'Kaart', jaar: kaart.jaar, naam: kaart.naam, thumbnail: kaart.thumbnail })),
  ...historischMarkers.map(marker => ({ type: 'Foto', jaar: marker.jaar, naam: marker.naam, thumbnail: marker.image_path }))
].sort((a, b) => a.jaar - b.jaar);

const rasterStatus = document.getElementById('raster-status');
let historischeKaartenGeladen = false;
const kaartMarkers = [];

function werkJaarBij() {
  const jaar = Number(yearSlider.value);
  yearValue.textContent = `Geselecteerd jaar: ${jaar}`;

  if (historischeKaartenGeladen) {
    historischKaarten.forEach(kaart => {
      rasterControl.setVisible(`historisch-${kaart.naam}{${kaart.jaar}}`, kaart.jaar === jaar);
    });
  }

  kaartMarkers.forEach(item => {
    const zichtbaar = item.jaar == jaar;
    if (zichtbaar && !item.zichtbaar) {
      item.marker.addTo(map);
      item.zichtbaar = true;
    } else if (!zichtbaar && item.zichtbaar) {
      item.marker.remove();
      item.zichtbaar = false;
    }
  });

  markeerActiefJaar(jaar);
}

function markeerActiefJaar(jaar) {
  archiveList.querySelectorAll('.archive-item').forEach(button => {
    button.classList.toggle('is-active', Number(button.dataset.jaar) === jaar);
  });
}

function gaNaarJaar(jaar) {
  yearSlider.value = jaar;
  werkJaarBij();
}

function maakArchiefItem(item) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'archive-item';
  button.dataset.jaar = item.jaar;

  let thumb;
  if (item.thumbnail) {
    thumb = document.createElement('img');
    thumb.src = item.thumbnail;
    thumb.alt = '';
    thumb.loading = 'lazy';
  } else {
    thumb = document.createElement('span');
    thumb.textContent = item.type;
  }
  thumb.classList.add('archive-item__thumb');

  const meta = document.createElement('span');
  meta.className = 'archive-item__meta';
  const year = document.createElement('span');
  year.className = 'archive-item__year';
  year.textContent = item.jaar;
  const name = document.createElement('span');
  name.className = 'archive-item__name';
  name.textContent = item.naam;
  name.title = item.naam;
  const type = document.createElement('span');
  type.className = 'archive-item__type';
  type.textContent = item.type;
  meta.append(year, name, type);

  button.append(thumb, meta);
  button.addEventListener('click', () => gaNaarJaar(item.jaar));
  li.append(button);
  return li;
}

function toonArchiefLijst() {
  const zoekterm = archiveSearch.value.trim().toLowerCase();
  const gefilterd = archiefItems.filter(item =>
    `${item.naam} ${item.jaar} ${item.type}`.toLowerCase().includes(zoekterm)
  );

  if (gefilterd.length === 0) {
    const leeg = document.createElement('li');
    leeg.className = 'archive-panel__empty';
    leeg.textContent = 'Geen resultaten gevonden.';
    archiveList.replaceChildren(leeg);
    return;
  }

  archiveList.replaceChildren(...gefilterd.map(maakArchiefItem));
  markeerActiefJaar(Number(yearSlider.value));
}

archiveSearch.addEventListener('input', toonArchiefLijst);
toonArchiefLijst();

function initialiseerHistorischeMarkers() {
  const aantallenPerLocatie = new Map();
  historischMarkers.forEach(item => {
    const sleutel = item.coordinates.join(',');
    aantallenPerLocatie.set(sleutel, (aantallenPerLocatie.get(sleutel) || 0) + 1);
  });

  const indexPerLocatie = new Map();
  historischMarkers.forEach(item => {
    const sleutel = item.coordinates.join(',');
    const index = indexPerLocatie.get(sleutel) || 0;
    indexPerLocatie.set(sleutel, index + 1);
    const aantal = aantallenPerLocatie.get(sleutel);
    const offsetX = (index - (aantal - 1) / 2) * 124;

    const element = document.createElement('div');
    element.className = 'historical-marker';

    const thumbnail = document.createElement('img');
    thumbnail.className = 'historical-marker__image';
    thumbnail.src = item.image_path;
    thumbnail.alt = item.naam;
    thumbnail.loading = 'lazy';

    const name = document.createElement('span');
    name.className = 'historical-marker__name';
    name.textContent = item.naam;
    element.append(thumbnail, name);

    const popupContent = document.createElement('div');
    popupContent.className = 'historical-popup';
    const popupImage = document.createElement('img');
    popupImage.src = item.image_path;
    popupImage.alt = item.naam;
    const popupName = document.createElement('strong');
    popupName.textContent = item.naam;
    popupContent.append(popupImage, popupName);

    const marker = new maplibregl.Marker({ element, anchor: 'bottom', offset: [offsetX, 0] })
      .setLngLat(item.coordinates)
      .setPopup(new maplibregl.Popup({ offset: 12 }).setDOMContent(popupContent));

    kaartMarkers.push({ jaar: item.jaar, marker, zichtbaar: false });
  });

  werkJaarBij();
}

async function laadHistorischeKaarten() {
  try {
    for (const kaart of historischKaarten) {
      await rasterControl.addRaster(kaart.tileUrl, {
        id: `historisch-${kaart.naam}{${kaart.jaar}}`,
        name: kaart.naam,
        zoomTo: false,
        state: {
          visible: kaart.jaar === Number(yearSlider.value)
        }
      });
    }
    historischeKaartenGeladen = true;
    rasterStatus.textContent = '';
    werkJaarBij();
  } catch (error) {
    console.error('Historische TIFF-kaarten laden is mislukt:', error);
    rasterStatus.textContent = 'Kaart laden mislukt. Controleer of de TIFF-bestanden Cloud Optimized GeoTIFFs zijn.';
  }
}

yearSlider.addEventListener('input', werkJaarBij);


const customBasemaps = [
  {
    id: 'osm',
    name: 'OpenStreetMap',
    provider: 'openstreetmap',
    type: 'raster',
    category: 'Basiskaarten',
    attribution: '&copy; OpenStreetMap-bijdragers',
    source: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 19,
    },
    tags: ['straat', 'openstreetmap'],
  },
  {
    id: 'pdok-luchtfoto',
    name: 'PDOK Luchtfoto',
    provider: 'pdok',
    type: 'raster',
    category: 'Basiskaarten',
    attribution: '&copy; Kadaster / PDOK',
    source: {
      type: 'raster',
      tiles: [
        'https://service.pdok.nl/hwh/luchtfotorgb/wms/v1_0?service=WMS&request=GetMap&version=1.1.1&layers=Actueel_orthoHR&styles=&format=image/png&transparent=true&srs=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}',
      ],
      tileSize: 256,
      maxzoom: 19,
    },
    tags: ['luchtfoto', 'pdok'],
  },
];

map.on('load', () => {
  initialiseerHistorischeMarkers();
  laadHistorischeKaarten();

  const basemaps = new BasemapControl({
    basemaps: customBasemaps,
    providers: [
      { id: 'openstreetmap', name: 'OpenStreetMap', category: 'Basiskaarten' },
      { id: 'pdok', name: 'PDOK', category: 'Basiskaarten' },
    ],
    includeDefaultBasemaps: false,
    defaultBasemapId: 'osm',
    title: 'Kaartlagen',
  });
  map.addControl(basemaps, 'top-left');
});