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

1. Zet je code in een GitHub repository (bijvoorbeeld `zeelandtimemachine`).
2. Ga in GitHub naar je repository > Settings > Pages.
3. Kies bij "Source" de branch (meestal `main` of `master`) en selecteer de map `public` als root ("/public").
4. Sla op. Je site wordt nu automatisch gepubliceerd op `https://<gebruikersnaam>.github.io/<repo-naam>/`.

Let op: Zet je startbestand in de map `public` en zorg dat het `index.html` heet.

Meer info: https://pages.github.com/

## Kaartstijl aanpassen
De standaardstijl gebruikt een open MapLibre demo-stijl. Je kunt deze aanpassen in `app.js` bij de `style`-property.

## Licentie
MIT
