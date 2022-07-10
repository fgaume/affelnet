# Boite à outils Affelnet

## Stockage des données saisies

A part les seuils d'admission qui sont poussés dans le backend Firebase ([Firestore](https://firebase.google.com/products/firestore)) afin que tout le monde en profite instantanément, toutes les autres données saisies sont stockées localement dans le navigateur. 

## Sources de données

### Appels d'API externes

* la relation entre les collèges et les lycées de secteur (1,2 ou 3) est exposée via l’[API](https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query?where=R%C3%A9seau%3D%27BUFFON%27+and+secteur%3D%271%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Nom&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=) sur laquelle se base la [carte interactive des lycées de secteur](https://rectoratparis.maps.arcgis.com/apps/webappviewer/index.html?id=d3ce515bc126417bae46f8ace91b0db2),
* les spécialités offertes par chaque lycée sont exposées via l’[API](https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/LES_ENSEIGNEMENTS_DE_SPECIALITE_EN_CLASSE_DE_PREMIERE_RS_2021/FeatureServer/0/query?where=ENSEIGNEMENT_DE_SPECIALITE%3D%27LITTERATURE+LANGUES+ET+CULTURES+DE+L+ANTIQUITE%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ETABLISSEMENT&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=false&quantizationParameters=&sqlFormat=none&f=html&token=) sur laquelle se base la [carte interactive des spécialités](https://rectoratparis.maps.arcgis.com/apps/webappviewer/index.html?id=47c86e32215248a0a6846e098890e13c).

* les seuils d'admission collaboratifs sont stockés dans le backend Firebase ([Firestore](https://firebase.google.com/products/firestore)).

### Données incluses dans l'application

Elles se trouvent dans src/data :

* colleges.js : liste des bonus IPS issue de la [circulaire officielle](https://www.fcpe75.org/wp-content/uploads/2022/04/annexe-1-guide-affectation-lycee-24309.pdf)
* lycees.js : seuils d'admission des lycées (données collaboratives collectées depuis les fiches-barèmes officielles partagées par les parents)
* specialites.js : liste des noms de spécialités compatible avec l'API du Rectorat
* stats.js : liste des moyennes et écarts-types des années précédentes (déduites chaque année de 2 fiches-barèmes officielles différentes)

## Technologies utilisées

C'est une SPA ([Single Page Application](https://fr.wikipedia.org/wiki/Application_web_monopage)) dévelopée en Javascript, conçue pour un environnement mobile (smartphone, tablette etc.).

Les libraires utilisées : React ([Hooks](https://fr.reactjs.org/docs/hooks-intro.html)), [React-Bootstrap](https://react-bootstrap.github.io/), [react-bootstrap-typeahead](https://ericgio.github.io/react-bootstrap-typeahead/) et [Firebase](https://firebase.google.com/).


## Exécution en local

`npm start` : lance un serveur de dev qui expose l'aplication via localhost:3000

## Déploiement

`npm run build` : fabrique un package JS destiné à être servi statiquement par un serveur http

A date, ce package est exposé par un hosting Firebase. Donc pour déployer :

`firebase deploy` : déploie sur http://affelnet2022.web.app

---------------------------------------------------------------------------------------------


## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

