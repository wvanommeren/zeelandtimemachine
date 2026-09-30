# Zeeland Time Machine

Een browserapp die archiefbeschrijvingen uit een lokaal RiC-O/Turtle-bestand koppelt aan plaatsen in Zeeland en ze op een interactieve kaart toont.

## Starten op Windows

1. Open PowerShell in de projectmap, de map met `index.html`.
2. Start een lokale webserver:

   ```powershell
   py -m http.server 8000
   ```

   Als `py` niet beschikbaar is, probeer `python -m http.server 8000`.

3. Open [http://localhost:8000](http://localhost:8000) in je browser.
4. Stop de server met `Ctrl+C` in PowerShell.

## Publiceren met GitHub Pages

De app is een statische website. Er is geen buildstap of `npm install` nodig.

1. Push de projectbestanden naar een GitHub-repository.
2. Open in GitHub **Settings > Pages**.
3. Kies bij **Build and deployment** voor **Deploy from a branch**.
4. Selecteer de branch met de app en kies de map `/(root)`. Klik op **Save**.
5. Open de URL die GitHub Pages toont zodra de publicatie klaar is.

Publiceer de volledige projectmap, niet alleen `index.html`: `app.js`, `style.css` en de map `data/` moeten op hun huidige relatieve paden beschikbaar blijven. Zorg ook dat de twee historische TIFF-bestanden uit `app.js` in `data/` staan en als Cloud Optimized GeoTIFF beschikbaar zijn. De externe kaartlibraries en kaarttegels vereisen een internetverbinding.

## Benodigdheden

- Een lokale webserver tijdens ontwikkeling. De applicatie zelf is JavaScript en draait in de browser.
- Een internetverbinding voor MapLibre, de rasterplugin en de kaarttegels; de libraries worden vanaf CDN's geladen.
- De twee historische TIFF-bestanden in `data/` moeten als Cloud Optimized GeoTIFF beschikbaar zijn voor de rasterplugin.

De jaarschuifregelaar schakelt tussen Hattinga (1750) en Kuyper (1850). De transparantieschuifregelaar past de geselecteerde historische kaart aan.

## Bestanden

- `index.html`: startpagina.
- `app.js` en `style.css`: kaart, data-inlezing en vormgeving.
- `data/`: plaatsgegevens uit de Top250 GeoJSON en het archiefbestand.
- `public/`: een aparte, eenvoudigere variant van de app.