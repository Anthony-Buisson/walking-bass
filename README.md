# The Walking Bass · The Last Raver

Timetable des scènes Arcane, Station et Technobus (31 octobre, 18h00 – 05h00), installable comme appli et consultable hors ligne.

- Avant le samedi 31 octobre 18h00 : compte à rebours en jours, heures, minutes et secondes, sans direct.
- Pendant la nuit du festival : les artistes en train de jouer sont mis en avant d'après l'heure, minuit compris.
- À partir du dimanche 1er novembre 5h00 : message de fin, la timetable reste consultable.
- Un clic sur un artiste affiche ses styles de musique.
- La scène Technobus est dans la timetable, à droite (sur téléphone elle dépasse de l'écran et se fait défiler).
- L'onglet Plan (`#plan`) montre le plan du festival avec l'artiste en cours sur chaque scène, sans recharger la page.

Hébergement : GitHub Pages, branche `main`, dossier racine, sur https://walking-bass.easy-timetable.app (fichier `CNAME`). L'appli charge la dernière version dès qu'elle a du réseau (repli sur le cache hors ligne ou après 3 s). Changer `CACHE` dans `sw.js` n'est utile que si les polices, les icônes ou les images du plan (`img/`) changent.
