# Raamdecoratie Soete — nieuwe website

Statische website (HTML/CSS/JS, geen build nodig).
Lokaal bekijken: `python -m http.server 8123` in deze map, en open http://localhost:8123

## Pagina's
- `index.html`: home, met in één oogopslag wat Soete doet
- `producten.html`: gordijnen, shutters, jaloezieën, lamellen, rol/plissé, stoffering (met korte uitleg "wat is wat")
- `projecten.html`: galerij met filter en vergroting
- `over-ons.html`: verhaal, waarden, team, atelier
- `contact.html`: gegevens, openingsuren, formulier, kaart

## Foto's (map `images/`)
- `logo.png`: logo (donker op transparant), gemaakt uit het aangeleverde logo
- `projecten/p1` … `p7`: foto's per project, genummerd 01.jpg, 02.jpg, …
  Nieuw project: maak `p8` aan, zet er 01.jpg, 02.jpg, … in en kopieer een blok in `projecten.html` (pas `data-count` aan).
- Alle foto's zijn verkleind tot max. 2000 px voor snelle laadtijd.

## Nog in te vullen
Zoek naar `[` in de HTML-bestanden: namen en beschrijvingen van de teamleden (over-ons.html).
Contactgegevens (Delphine Soete, Mellestraat 3, 8501 Heule) komen van de oude website.
- Contactformulier: zonder `action` opent het een e-mail naar het adres in `data-mailto`. Voor echte verzending vul je een formulierservice in (bv. Formspree).

## Stijl
Kleuren en lettertypes staan bovenaan `css/style.css` (`:root`). Titels in Cormorant Garamond, tekst in Jost, accentkleur roestbruin (`--accent`).
