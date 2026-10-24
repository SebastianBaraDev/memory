# Planung: Memory-Spiel (Developer Akademie)

## Kontext
- Projekt im Rahmen der Fullstack-Umschulung (Developer Akademie), Frontend-Teil.
- Lernziel: SCSS (Nesting, Variablen, Mixins, Partials) und TypeScript (Klassen, Funktionen, Typen, Interfaces, Aufteilung in Module) festigen.
- Deadline: 6 Tage ab Di 20.10.2026 -> Abgabe spätestens So 25.10., Mo 26.10. als Puffer.
- Gesamtrahmen: Frontend-Teil muss bis Ende März 2027 fertig sein (ca. 4 Projekte inkl. Memory, darunter ein Gruppenprojekt mit 4-5 Wochen). Memory darf nicht länger als diese Woche dauern.

## Arbeitsweise mit Claude
- Sebastian schreibt den Code selbst. Claude erklärt, gibt Struktur vor, reviewt und hilft bei Fehlern. Keine fertigen Komplettlösungen vorgeben.
- Zeitbudget: ca. 4 Stunden pro Tag, aufgeteilt in feste Blöcke mit fester Startzeit.
- Jeder Tag hat ein sichtbares Ergebnis im Browser.
- Tägliches Check-in am Abend: Was steht, was hakt.
- Jede Session mit einer leichten, sicheren Aufgabe starten (Einstieg erleichtern).

## Aktueller Stand (20.10.)
- Projekt angelegt, Vite installiert, Grundordner vorhanden.
- Noch kein Code geschrieben.
- Figma-Design mit genauer Vorgabe vorhanden. Alle Assets (Motive, Icons, Farben, Schriften) kommen aus Figma.

## Anforderungen (Checkliste)
**User Story 1 - Homescreen**
- Homescreen nach Figma-Vorgabe
- Button zur Settings-Page
- Controller-Icon mit Animation, korrekt positioniert
- Auf dem Startbildschirm soll zwischen mindestens 2 und bis zu 4 Designs gewechselt werden können

**User Story 2 - Settings**
- 2 Spieler zur Auswahl (z. B. Blau / Orange)
- 3 Spielfeldgrößen: 4x4 / 4x6 / 6x6
- Mindestens 2 Themes auswählbar

**User Story 3 - Layouts**
- Auswahl verändert das Farbschema
- Auswahl verändert die Motive der Memory-Karten

**User Story 4 - Spielfeld**
- Spielfeld entspricht gewählter Größe
- Theme in Farbe und Motiven umgesetzt
- Über dem Spielfeld: Punktestand, aktueller Spieler, Button "Exit Game"
- Karten drehen sich beim Klick in flüssiger Animation

**User Story 5 - Game Over**
- "Game over"-Anzeige mit Punktestand
- Spieler mit den meisten Punkten wird als Gewinner angezeigt
- Möglichkeit, eine neue Runde zu starten

## Code-Konventionen (von Anfang an einhalten)
**TypeScript**
- Dateinamen in kebab-case
- Max. 14 Zeilen pro Funktion, eine Aufgabe pro Funktion
- Semikolons, 2 Leerzeichen Einrückung
- Kein `any` (besser exakter Typ oder `unknown`)
- Funktionen camelCase, Klassen/Interfaces/Typen PascalCase, Konstanten UPPER_CASE
- Typen und Rückgabewerte explizit angeben
- Imports gruppieren (Standard, Drittanbieter, Lokal)
- TSDoc für alle Funktionen und Methoden
- Keine Magic Numbers
- HTML-Templates auslagern statt inline
- Lesbare Bedingungen (`if (isGameOver)` statt `if (x)`)

**HTML**
- Semantische Tags (header, main, section, ...), sinnvolle Überschriften-Hierarchie
- Keine "div-Suppe", keine tiefen Verschachtelungen
- Englische, sprechende Namen
- alt-Texte für Bilder
- `<!DOCTYPE html>`, `<html lang="...">`, `meta charset="UTF-8"`, `<title>`, Favicon
- Struktur (HTML) und Darstellung (CSS) trennen
- Schriften lokal einbinden (eigene Dateien + `@font-face`), keine Links zu Google Fonts o. Ä.

## Design-Details aus Figma
- Ablauf: Home -> Settings -> Spielfeld -> Game over (Punktestand) -> Winner ODER Draw -> zurück zu Home.
- Draw-Screen bei Gleichstand (nicht in Checkliste, aber im Design).
- Feldgrößen: 16 = 4x4, 24 = 6 Spalten x 4 Reihen, 36 = 6x6.
- Homescreen und Settings-Seite sehen in allen Themes gleich aus (Homescreen dunkel #303131, Settings weiß). Auf Settings wechselt nur das Vorschaubild. Themes wirken also erst ab dem Spielfeld (Spielfeld, Game over, Winner, Draw).
- Schriften: Überschriften Red Rose, Fließtext Almarai (Code vibes). DA Projects nutzt Figtree.
- Widescreen ab 1440px: Content gleich breit + zentriert, Hintergrund volle Breite, langer Konfettistreifen.
- Buttons haben Hover-Zustände: Play (größer), Exit game (gelber, dickerer Rahmen), Start (größer).
- Radio-Buttons: gewählt = fett + gelbe Linie mit Raute.
- Klick auf "Exit game" öffnet ein Bestätigungs-Popup (`<dialog>`) mit "Back to game" und "Exit game". Beide Buttons haben Hover-Zustände.
- Match status: Gefundene Paare bekommen einen farbigen Rahmen (Theme-Farbe) und bleiben aufgedeckt.
- Settings: Beim Hover über ein Theme wechselt das Vorschaubild sofort (nicht erst beim Auswählen). -> später umsetzen.
- Settings-Leiste unten: Platzhalter "Theme / Player / Board size" werden durch die Auswahl ersetzt. Start-Button ist disabled (grau), bis alle drei gewählt sind. Nichts ist vorausgewählt.

## Farben & Schriften
| | Code vibes (theme-1) | DA Projects (theme-2) |
|---|---|---|
| Schrift | Red Rose | Figtree |
| Primär/Hintergrund | #303131 | #1E7594 |
| Game-Over-Titel | #4DD5BC | #FD5B4F |
| Spieler Orange | #F58E39 | #F58E39 (mit weißem Rahmen) |
| Spieler Blau | #2BB1FF | #2BB1FF (mit weißem Rahmen) |
| Fließtext-Schrift (z. B. "It's play time.") | Almarai | ? |
| Button-Gelb (Play, Start) | #F0EA6E | #F0EA6E |

## Architektur-Entscheidungen
- Themes über CSS Custom Properties + `data-theme`-Attribut am `body`. Jedes weitere Theme = nur Farben + Bilder, keine neue Logik.
- Die ersten 2 Themes: Code vibes (theme-1, dunkel/türkis) und DA Projects (theme-2, blau/weiß, Motive aus DA-Projekten wie Sakura Ramen).
- Erst 2 Themes komplett fertig, Theme 3 und 4 nur, wenn alles andere steht.
- Settings werden in einem typisierten Objekt (Interface) gespeichert.
- Geplante Struktur:
```
src/
  styles/   _variables.scss, _mixins.scss, _base.scss, _themes.scss, main.scss
  scripts/  main.ts, templates.ts, game.ts, settings.ts, types.ts
assets/     img/theme-1/, img/theme-2/, icons/
```

## Tagesplan
| Tag | Ziel (am Abend sichtbar) |
|---|---|
| Di 20.10. (ca. 1 h) | Figma-Assets exportiert, Sass installiert (`npm i -D sass`), Ordnerstruktur steht, eine Karte dreht sich per Klick |
| Mi 21.10. | SCSS-Struktur + Theme-System, Homescreen mit Start-Button und animiertem Controller-Icon |
| Do 22.10. | Settings-Page: Spieler, Feldgröße, Theme - Auswahl im typisierten Objekt gespeichert |
| Fr 23.10. | Spielfeld 4x4/4x6/6x6, Karten gemischt, Flip-Animation, Header mit Punktestand, aktuellem Spieler, Exit-Button |
| Sa 24.10. | Spiellogik: Paare vergleichen, Spielerwechsel, Punkte, Spielende erkennen |
| So 25.10. | Game-Over-Screen mit Gewinner + neue Runde, Checkliste und Konventionen vollständig prüfen, Abgabe |
| Mo 26.10. | Puffer, ggf. Theme 3 und 4 |

## Fortschritt
- [x] Di 20.10. – Struktur steht, Assets exportiert (18 Motive je Theme), Karte dreht per Klick (BEM, Guard Clause). Offen: Farben + Schriften aus Figma für Mi.
- [x] Mi 21.10. – SCSS-Partials mit @use, Variablen, Schriften lokal (@font-face), Homescreen-HTML + Grundlayout, Controller positioniert. Offen (Do-Einstieg, ca. 30 min): Controller-Animation mit @keyframes (Schritt 6), Play-Button fertig stylen (Padding, Hover). Theme-System -> Fr.
- [x] Do 22.10. (nur 1 h) – Homescreen fertig: Margins zurückgesetzt, hgroup, Play-Button gestylt + Hover-Animation (Button scale, Controller-Icon rotate, Pfeil scale). Laut Figma ist der große Controller NICHT animiert; die Checklisten-Animation = Hover am Play-Button. Settings-Seite noch nicht begonnen -> Fr.
- [x] Fr 23.10. – Screens als Templates (home-template.ts, settings-template.ts), renderScreen(template), Play -> Settings. Settings-HTML + Styling (Radio-Gruppen, BEM, value = Ordnername). GameSettings-Interface (types.ts), settings-Objekt, change-Listener mit forEach, updateSettings mit switch. Offen: Schritt 6 (Leiste füllen + Start freischalten), Hover-Vorschau.
- [ ] Sa 24.10.
- [ ] So 25.10.
- [ ] Mo 26.10.
