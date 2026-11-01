# Documents togolais — recherche du 4 octobre 2026

## Résultat et limites

La recherche a privilégié les organismes émetteurs et le portail Service Public. Plusieurs requêtes du moteur n’ont donné aucun résultat pertinent ; les pages officielles ont ensuite été consultées directement. L’absence de spécimen récupéré n’implique pas l’absence du document.

| Document | Source consultée | Ce qui est établi | Traitement dans CARDIA |
|---|---|---|---|
| e-ID | [ANID, e-ID Togo](https://anid.gouv.tg/en/e-id-togo-2/) et [visuel publié par l’ANID](https://anid.gouv.tg/wp-content/uploads/2024/11/CARTE-e-ID-2.png) | Le projet repose sur un NIU et des données biographiques/biométriques. Le recto publié comporte portrait à gauche, identifiant sous le portrait, champs bilingues à droite, nom, prénoms, naissance et sexe. | Disposition du recto reprise avec portrait fictif, identifiant DEMO et zone de code non fonctionnelle. Aucun verso vérifié : face arrière explicitement présentée comme fiche CARDIA. |
| Carte d’électeur | [ANID, justificatifs pour l’enrôlement](https://anid.gouv.tg/en/e-id-togo-2/) ; tentatives d’accès à `ceni-tg.org` et `www.ceni-tg.org` | L’ANID cite la carte d’électeur parmi les justificatifs. Les pages CENI interrogées n’ont pas fourni de contenu exploitable. | Maquette provisoire, sans sceau officiel. Couleurs, placement et champs ne sont pas validés comme ceux d’une carte CENI. |
| Carte universitaire de Lomé | Tentatives d’accès à `univ-lome.tg`, `www.univ-lome.tg` et recherche interne | Échecs d’accès et absence de spécimen récupéré. Aucun modèle précis validé. | Proposition graphique CARDIA marquée « visuel officiel à confirmer ». Ne pas la présenter comme reproduction de la carte UL. |
| Carte étudiant IRES-RDEC | [Service Public : délivrance de la carte d’étudiant](https://service-public.gouv.tg/service/696a3c5af08be43ffe98cd67/education-formation/341v7l5t83343) | Existence de la carte et validité pour l’année scolaire en cours. La page ne fournit pas de spécimen. | Modèle provisoire distinct, sans logo institutionnel inventé, année 2026–2027 fictive. |

## Autres documents identifiés pour la suite

- [Passeport — Service Public](https://service-public.gouv.tg/service/62a3c668c07b617d9d1be12b/papiers-citoyennete/demande-de-passeport) : la page décrit les passeports ordinaire, de service et diplomatique et la DGDN. Aucun spécimen exploitable étudié ; pas de nouveau visuel ajouté.
- [Carte de séjour — Service Public](https://service-public.gouv.tg/service/62a3b6e4c07b617d9d1b9bd9/papiers-citoyennete/demande-de-carte-de-sejour) : plusieurs types sont décrits. Aucun spécimen vérifié ; pas de nouveau visuel ajouté.

Le domaine `republiquetogolaise.com` consulté renvoyait un contenu sans rapport avec les documents togolais ; il a été écarté des références.

## Gestion des références

`references/anid-eid-reference.png` est le visuel institutionnel consulté pour l’analyse, conservé hors du code de l’application. Il n’est pas importé dans les bundles. Les noms, photographie et codes qu’il contient ne sont pas réutilisés dans les modèles. Les dessins SVG embarqués ne reproduisent ni empreinte biométrique, ni signature, ni code lisible.

Les statuts et liens sont attachés aux modèles dans `src/data.js` et affichés dans leurs fiches. Les dates, parcours universitaires et identifiants de démonstration ne constituent pas des renseignements officiels. L’e-ID n’est pas présentée comme remplaçant juridiquement la CNI.

## Références encore nécessaires

Recto/verso d’un spécimen CENI, carte universitaire UL, carte IRES-RDEC et verso e-ID. Lorsqu’une référence vérifiée sera disponible, remplacer la maquette concernée et mettre à jour son statut ; ne pas supprimer le marquage de démonstration dans ce prototype.
