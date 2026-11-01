# CARDIA — Spécification d'implémentation (React Native + Expo)

Référence visuelle : `Cardia v2.dc.html` (prototype), `Cardia Design System.dc.html` (tokens, composants, catalogue).
Référence données : `templates.js` (catalogue + moteur `resolve()`).

## 1. Stack

- Expo SDK récent, TypeScript, Expo Router
- `react-native-reanimated` + `react-native-gesture-handler` : carrousel, flip, transitions
- `react-native-svg` : drapeaux, QR, icônes
- `expo-camera` + OCR (ML Kit via module natif ou service serveur) : scanner
- `expo-secure-store` (PIN, clés), `expo-local-authentication` (Face ID / empreinte)
- Stockage cartes : SQLite chiffré (`expo-sqlite` + SQLCipher) ; aucune donnée en clair sur disque
- `expo-brightness` : luminosité maximale en mode présentation
- `react-native-qrcode-svg` pour de vrais QR (le prototype affiche des QR factices marqués DEMO)

## 2. Modèle de données

```ts
type CountryCode = 'TG' | 'CI' | 'GH' | 'BJ' | 'SN' | string;
type CategoryId = 'identite' | 'transport' | 'assurance' | 'education' | 'banque' | 'pro' | 'fidelite' | 'autre';
type Layout = 'id' | 'passport' | 'bank' | 'member' | 'ticket';

interface FieldDef { label: string; key: string; span?: 1 | 2; }

interface CardTemplate {
  id: string;                 // ex. TGO_IDENTITY_CNI_DEMO
  version: string;            // semver, migrations des données utilisateur
  country: CountryCode;
  category: CategoryId;
  type: string;               // libellé affiché
  layout: Layout;
  ratio: number;              // 1.586 ID-1 · 1.42 passeport · 2.3 billet
  palette: { bg: string; band: string; ink: string; accent?: string; soft?: string; cover?: string; gold?: string };
  title?: string; titleAlt?: string; org?: string; issuer?: string; network?: 'visa' | 'mc';
  front: { fields?: FieldDef[]; photo?: boolean; chip?: boolean };
  back:  { fields?: FieldDef[]; qr?: boolean; mrz?: boolean; signature?: boolean; barcode?: boolean;
           cats?: [string, string][]; note?: string; cover?: boolean };
}

interface WalletCard {
  uid: string;
  templateId: string;          // ou template embarqué pour les cartes personnalisées
  data: Record<string, string>; // valeurs propres à la carte (écrasent le profil)
  photoUri?: string;           // fichier chiffré local
  favorite: boolean;
  createdAt: string; updatedAt: string;
}

interface UserProfile { lastName: string; firstNames: string; birthDate?: string; sex?: 'M' | 'F'; phone: string; }
```

Résolution : `resolve(template, profile, card.data) → ResolvedCard` (voir `templates.js`). Ordre de priorité des valeurs : `card.data` > `profile` > valeurs par défaut du modèle.

## 3. Distribution des templates (10 → 1 000+)

- Les templates sont des JSON versionnés, servis par une API (`GET /templates?country=TG&since=<version>`), mis en cache localement.
- L'app ne contient que les 5 layouts ; ajouter un document = publier un JSON.
- Index par `country → category → template` ; recherche plein texte sur `type`, `issuer`, synonymes.
- Champ `minAppVersion` pour les templates qui exigent un nouveau layout.
- Les palettes, zones et libellés de chaque document officiel doivent être validés contre les spécimens publiés par l'autorité (ANID, ONECI, NIA, ANIP, DAF…). Aucun élément de sécurité (hologrammes, micro-impression, motifs UV) n'est reproduit.

## 4. Composants

| Composant | Rôle | Props principales |
|---|---|---|
| `DigitalCard` | Rend recto + verso d'une carte résolue, à toute largeur | `card`, `width`, `flipped`, `axis: 'x' \| 'y'`, `shadow` |
| `CardFront` / `CardBack` | Un composant par layout, dessiné à 320 px puis mis à l'échelle (`transform: scale(width/320)`) | `card` |
| `CardFlip` | Rotation 3D Reanimated, `backfaceVisibility: 'hidden'` + bascule d'opacité à 50 % (fiable Android) | `flipped`, `axis`, `duration` |
| `CardCarousel` | Pan horizontal suivi au doigt, élastique aux bords, profondeur, flou des voisines | `cards`, `index`, `onIndexChange`, `onFlip` |
| `CardIndicator` | Pagination animée | `count`, `index` |
| `CardCountry` | Drapeau SVG + nom + nombre de modèles | `country`, `onPress` |
| `CardCategory` | Tuile catégorie, état « Bientôt » | `category`, `count` |
| `CardScanner` | Caméra + cadre au ratio du modèle, états détection / OCR / résultat | `template?`, `onResult` |
| `CardPreview` | Aperçu d'un modèle avec données de démo | `template` |
| `CardPresentation` | Plein écran sombre, luminosité max, QR | `card` |
| `Flag` | Drapeaux SVG (viewBox 30×20) | `code` |

## 5. Carrousel — règles

- Boîte du conteneur : 300 × 196 pt. `w = min(300, 196 × ratio)`, `h = w / ratio`, centrage vertical.
- Pas entre cartes : 258 pt. Voisines : `scale 0.82`, `rotateY ∓12°`, opacité 0,9, flou 0,7 pt (désactivable).
- Geste : verrouillage d'axe après 8 pt. Horizontal → carte suivante si |dx| > 70 pt ou vitesse > 0,5 pt/ms ; amortissement × 0,3 aux extrémités.
- Vertical vers le bas > 30 pt → flip (axe X). Vers le haut → retour au recto. Tap sur la carte active → flip.
- Changer de carte remet la carte au recto.

## 6. Tokens

- Couleurs : primary `#1F5BFF`, primary deep `#0B3FD1`, ink `#0F1B3D`, ink muted `#4A5675`, surface `#F6F8FC`, success `#16A34A`, danger `#E5484D`, fond présentation `#060A14`.
- Typo : Plus Jakarta Sans — Display 29/800, Title 24/800, Heading 18/800, Body 15/600, Caption 13/500, Label 12/800 +12 %. Mono système pour ID de modèles et MRZ.
- Rayons : carte 14 (base 320, soit 4,4 % de la largeur), bouton 16 (h 54), champ 14 (h 50), tuiles 18–22.
- Ombres : carte `0 14 32 rgba(15,35,90,.22)`, UI `0 4 14 rgba(30,60,140,.06)`.
- Espacement : 4 · 8 · 10 · 14 · 20 · 24 · 32 ; marges écran 20–24.

## 7. Animations

| Nom | Durée | Courbe |
|---|---|---|
| Swipe | 500 ms | `Easing.bezier(.2,.8,.2,1)` ou ressort (damping 18, stiffness 180) |
| Flip | 600 ms | `bezier(.3,.7,.2,1)` |
| Add | 700 ms | ressort avec dépassement ; entrée depuis `translateY 60, scale .6` |
| Delete | 450 ms | chute `translateY 170`, `rotate 8°`, fondu, puis retrait |
| Present | 350–500 ms | fondu du fond, carte `scale .85 → 1` |
| Étapes du parcours d'ajout | 300 ms | fondu + `translateX 24 → 0` |

Respecter `AccessibilityInfo.isReduceMotionEnabled` : remplacer flip et swipe par des fondus.

## 8. Parcours

1. Onboarding → Inscription → Sécurité (PIN + biométrie) → Wallet vide → Ajouter → Togo → Identité → CNI → Scanner → Vérification → Carte ajoutée → Carrousel.
2. Wallet → swipe → Mastercard → Voir → Retourner → Présenter.
3. Ajouter → Pays → Côte d'Ivoire → Identité → CNI → Aperçu.
4. Ajouter → Ghana → Identité → Ghana Card.
5. Ajouter → Scanner → Non reconnue → Carte personnalisée.

## 9. Scanner

- Pipeline : capture → détection du document (bords, ratio) → classification pays/type (modèle on-device entraîné sur spécimens publics) → choix du template → OCR des champs déclarés par le template → écran de vérification avec indice de confiance par champ.
- Seuil de confiance de classification < 0,6 → écran « carte inconnue » → carte personnalisée.
- Traitement sur l'appareil par défaut ; aucune image envoyée sans consentement explicite.

## 10. Sécurité et conformité

- Cartes bancaires : seuls réseau, banque, 4 derniers chiffres, titulaire, expiration. Jamais de PAN complet ni de CVV stockés.
- Documents officiels : la carte CARDIA est une représentation de commodité, pas un titre officiel. Mention visible dans la fiche et dans le mode présentation.
- Verrouillage à l'ouverture et après 60 s en arrière-plan ; masquage dans le sélecteur d'apps.
- Prototype et environnements de test : données, portraits et numéros fictifs, mention DEMO / CARDIA sur chaque carte.
- Conformité données personnelles : loi togolaise sur la protection des données à caractère personnel et équivalents CI, GH, BJ, SN ; consentement, export et suppression du compte.

## 11. États

- Vide : wallet sans carte, liste filtrée vide, catégorie sans modèle (« Bientôt »).
- Erreurs : caméra refusée, document non reconnu, OCR incomplet (champs à compléter), échec de synchronisation des templates (catalogue en cache), PIN incorrect (3 essais puis délai).
