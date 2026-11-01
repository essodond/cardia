# CARDIA — nouvelle interface

Frontend React Native, **Expo SDK 57**, basé sur la nouvelle référence :
`Cardia new/cardia-digital-wallet/project/Cardia App.dc.html`.

## Lancement

```sh
npm install
npm start
# ou
npm run web
npm run android
```

Expo Go doit être compatible avec SDK 57. Un simulateur iOS nécessite macOS.

## Interface et fonctionnement

- Accueil : logo avec signature, salutation, carrousel 3D (Mastercard active initialement), quatre raccourcis, neuf catégories et rappel assurance.
- Carrousel : toutes les cartes, dimensions 256 × 168, pas 236, voisines à 84 % et rotation de 22°. Glisser horizontalement change la carte ; glisser vers le bas affiche le verso, vers le haut affiche le recto. Toucher le recto ouvre sa fiche. Pagination et texte d’aide également interactifs.
- Cartes : filtres horizontaux par catégorie, liste à miniatures dégradées, état vide.
- Recherche : nom, catégorie, organisme et numéro, avec compteur de résultats.
- Profil : Face ID simulé, rappels, langue, aide et déconnexion locale.
- Détail : panneau inférieur, numéro masqué/affiché, catégorie, expiration, partage et suppression.
- Ajout : panneau inférieur, neuf catégories, nom obligatoire, numéro et expiration facultatifs.
- Scanner : détection simulée après 2,2 secondes, puis enregistrement de « Carte Fidélité Plus ».

Les noms, textes, neuf cartes initiales, couleurs, tailles, rayons et icônes sont repris de la nouvelle référence. L’ancien onglet Explorer et les anciens parcours ne font plus partie de l’interface active. La version précédente est conservée dans `archive/previous-ui`.

## Données simulées

### Catalogue togolais

Dans **Ajouter une carte → Choisir un document togolais** : e-ID ANID, carte d’électeur, carte étudiant de Lomé et carte étudiant IRES-RDEC. Le recto e-ID est documenté ; les autres graphismes sont des maquettes marquées « à confirmer ». Le statut et les sources sont consultables depuis la fiche de chaque carte. Les versos non documentés affichent une fiche complémentaire CARDIA explicitement identifiée.

Voir `docs/TOGO-REFERENCES.md` pour les sources, limites de recherche et références nécessaires. Le rendu est dans `src/NationalDocument.js`. Le wallet initial garde neuf cartes ; sa carte étudiante utilise désormais la maquette universitaire signalée comme provisoire.

### Carte nationale d’identité togolaise

Le modèle `togo-cni` reprend la disposition de la version physique montrée dans les photos fournies : fond ivoire, en-tête vert/rouge, portrait à gauche, champs à droite, emplacements de signatures et verso structuré. `src/TogoIdentityCard.js` le dessine en SVG natif à toutes les tailles, dans le carrousel, la liste et la fiche avec sélection recto/verso.

Le portrait est une illustration fictive. Les signatures, l’emblème officiel et les codes réels ne sont pas copiés. Les zones de code sont non fonctionnelles et chaque face indique « DÉMONSTRATION · DONNÉES FICTIVES · SANS VALEUR OFFICIELLE ». Les photos sources et leurs données personnelles ne sont pas intégrées au projet.

Aucun backend ni appel réseau pour les cartes. Les données sont fictives et restent en mémoire ; elles se réinitialisent au redémarrage. La police Plus Jakarta Sans est embarquée. Face ID, déconnexion et scanner ne constituent pas une authentification ou une reconnaissance réelle. Le rappel garde la date fixe du prototype.

Le partage ouvre la feuille de partage du système avec un résumé masqué ; aucun lien sécurisé fictif n’est annoncé comme copié. Aide et déconnexion sont fonctionnelles, contrairement aux boutons sans gestionnaire du HTML. Les rappels peuvent être désactivés dans Profil.

## Fichiers

- `App.js` : navigation, écrans, panneaux, scan et état local.
- `src/CardCarousel.js` : gestes, animations 3D, recto/verso, réduction des animations.
- `src/components.js` : typographie, SVG, dégradés et faces des cartes.
- `src/data.js` : données fictives, catégories, recherche et masquage.
- `tests/wallet.test.cjs` : tests de données et règles du wallet, sans dépendance de test externe.

## Vérification

```sh
npm test
npm run check
npm run export
```

Les exports web, Android et iOS ont été générés avec succès après la refonte. Les tests des données, de la recherche, du masquage et de l’ajout passent. Le contrôle visuel automatisé et les gestes sur appareil restent à vérifier : le navigateur de l’environnement n’a pas autorisé l’accès à l’aperçu. La conformité pixel par pixel n’est donc pas certifiée.
"# cardia" 
