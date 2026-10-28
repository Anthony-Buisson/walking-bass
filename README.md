# The Walking Bass · The Last Raver

Timetable des scènes Arcane et Station (31 octobre, 18h00 – 05h00), installable comme appli et consultable hors ligne.

- Les artistes en train de jouer sont mis en avant d'après l'heure seule, minuit compris.
- Un clic sur un artiste affiche ses styles de musique.
- L'onglet Plan (`#plan`) montre le plan du festival avec l'artiste en cours sur chaque scène, sans recharger la page. La programmation est dans `timetable.js`.

Hébergement : GitHub Pages, branche `main`, dossier racine, sur https://walking-bass.easy-timetable.app (fichier `CNAME`). L'appli charge la dernière version dès qu'elle a du réseau (repli sur le cache hors ligne ou après 3 s). Changer `CACHE` dans `sw.js` n'est utile que si les polices, les icônes ou les images du plan (`img/`) changent.
