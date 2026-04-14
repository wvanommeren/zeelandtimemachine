# Zeeland Time Machine – Delta Archieven

Een webapplicatie met MapLibre GL JS voor het verkennen van de Delta Archieven in Zeeland.

## Features
- Open source kaart met MapLibre GL JS
- LOD (Level of Detail) afhankelijk van zoomniveau
- Geschikt voor hosting op statische webhosting (zoals GitHub Pages, Vercel, Netlify, eigen server)

## Snel starten
1. Download of clone deze repository.
2. Zet de inhoud van de `public` map online op je webserver of hostingplatform.

### Lokaal testen
Open `public/index.html` direct in je browser, of gebruik een lokale webserver:

**Met Python 3:**

    cd public
    python -m http.server 8000

Open dan [http://localhost:8000](http://localhost:8000) in je browser.


### Publiceren op GitHub Pages

GitHub Pages ondersteunt alleen de root (`/`) of de map `docs/` als publicatiemap. Volg deze stappen:

1. Hernoem de map `public` naar `docs` in je repository.
2. Zet al je webbestanden (zoals `index.html`, `app.js`, `style.css`) in de map `docs`.
3. Commit en push deze wijziging naar GitHub.
4. Ga in GitHub naar je repository > Settings > Pages.
5. Kies bij "Source" de branch (meestal `main` of `master`) en selecteer de map `docs` als root.
6. Sla op. Je site wordt nu automatisch gepubliceerd op `https://<gebruikersnaam>.github.io/<repo-naam>/`.

Meer info: https://pages.github.com/

## Kaartstijl aanpassen
De standaardstijl gebruikt een open MapLibre demo-stijl. Je kunt deze aanpassen in `app.js` bij de `style`-property.

## Licentie
MIT
