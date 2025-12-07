# Boite à outils Affelnet

## Licence

Le code de l'application est complètement libre, sous licence [GNU GPL v3](http://www.gnu.org/licenses/gpl-3.0.html).
Elle est ouverte aux améliorations (pull requests GitHub), n'hésitez pas !

## Stockage des données saisies

A part les seuils d'admission (collaboratifs) qui sont stockés dans le backend Firebase ([Firestore](https://firebase.google.com/products/firestore)) afin que tout le monde en profite instantanément, toutes les autres données saisies sont stockées localement dans le navigateur. 

## Sources de données

### Appels d'API externes

* la relation entre les collèges et les lycées de secteur (1,2 ou 3) est exposée via l’[API](https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query?where=R%C3%A9seau%3D%27BUFFON%27+and+secteur%3D%271%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Nom&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=) sur laquelle se base la [carte interactive des lycées de secteur](https://rectoratparis.maps.arcgis.com/apps/webappviewer/index.html?id=d3ce515bc126417bae46f8ace91b0db2),
* 
* les spécialités offertes par chaque lycée sont exposées via l’[API](https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/LES_ENSEIGNEMENTS_DE_SPECIALITE_EN_CLASSE_DE_PREMIERE_RS_2021/FeatureServer/0/query?where=ENSEIGNEMENT_DE_SPECIALITE%3D%27LITTERATURE+LANGUES+ET+CULTURES+DE+L+ANTIQUITE%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ETABLISSEMENT&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=false&quantizationParameters=&sqlFormat=none&f=html&token=) sur laquelle se base la [carte interactive des spécialités](https://rectoratparis.maps.arcgis.com/apps/webappviewer/index.html?id=47c86e32215248a0a6846e098890e13c).

* les seuils d'admission collaboratifs sont stockés dans le backend Firebase ([Firestore](https://firebase.google.com/products/firestore)).

### Appels d'API affelnet-paris

Les données non exposées par le Rectorat sont exposées via https://affelnet-paris.web.app

* liste des bonus IPS issue de la [circulaire officielle](https://www.fcpe75.org/wp-content/uploads/2022/04/annexe-1-guide-affectation-lycee-24309.pdf)
* seuils d'admission des lycées (données collaboratives collectées depuis les fiches-barèmes officielles partagées par les parents)
* liste des moyennes et écarts-types des années précédentes (déduites chaque année de 2 fiches-barèmes officielles différentes)

Remarque : cette API doit être disponible pour que l'app fonctionne.

## Technologies utilisées

C'est une PWA ([Progressive web app](https://fr.wikipedia.org/wiki/Progressive_web_app)) dévelopée en Javascript, conçue en particulier pour un environnement mobile (smartphone, tablette etc.).

Les libraires utilisées : [React Hooks](https://react.dev/)), [React-Bootstrap](https://react-bootstrap.github.io/), [react-bootstrap-typeahead](https://ericgio.github.io/react-bootstrap-typeahead/) et [Firebase](https://firebase.google.com/).


## Exécution en local

`npm start` : lance un serveur de dev qui expose l'application via localhost:3000

## Déploiement

`npm run build` : fabrique un package JS destiné à être servi statiquement par un serveur http

A date, ce package est exposé par un hosting Firebase. Donc pour déployer :

`firebase deploy` : déploie sur https://affelnet75.web.app

Une github action déploie automatiquement sur Firebase Hosting le code poussé sur la branche main et sur PR.

Attention à bien faire correspondre la version de l'app dans App.js et le app.json de affelnet-paris.
