import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { linearRegression } from 'simple-statistics';

const GraphiqueSeuils = ({ seuils, lyceeNom }) => {
  // Préparation des données pour la régression linéaire
  const dataForRegression = seuils.map(s => [Number(s.annee), Number(s.seuil)]);
  const regression = linearRegression(dataForRegression);
  const pente = regression.m;
  const ordonneeOrigine = regression.b;

  // Fonction pour calculer les points de la droite de régression
  const getRegressionPoint = (annee) => pente * annee + ordonneeOrigine;

  // Trouver l'année min et max pour la droite de régression et le graphique
  const anneeMin = Math.min(...seuils.map(s => Number(s.annee)));
  const anneeMax = Math.max(...seuils.map(s => Number(s.annee)));

  // Données pour le graphique
  const data = seuils.map(s => ({
    annee: Number(s.annee),
    seuil: Number(s.seuil), // On s'assure que c'est un nombre
  }));

  // Ajout des points extrêmes de la droite de régression
  data.push({ annee: anneeMin, regression: getRegressionPoint(anneeMin) });
  data.push({ annee: anneeMax, regression: getRegressionPoint(anneeMax) });

  // On force l'affichage de chaque année entière
  const ticks = [];
  for (let annee = anneeMin; annee <= anneeMax; annee++) {
    ticks.push(annee);
  }

  // Trouver le seuil min et max pour l'axe des ordonnées
  const seuilMin = Math.min(...data.map(s => s.seuil));
  const seuilMax = Math.max(...data.map(s => s.seuil));
  const margin = (seuilMax - seuilMin) * 0.1; // Marge de 10%

  return (
    <LineChart
      width={380}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 1, bottom: 5 }}
      style={{ backgroundColor: 'white' }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey="annee"
        type="number"
        domain={[anneeMin, anneeMax]}
        tickFormatter={(tick) => tick.toString()}
        ticks={ticks}
        interval={0}
      />
      <YAxis
        type="number"
        domain={[seuilMin - margin, seuilMax + margin]} // Marge autour des seuils min et max
        tickFormatter={(tick) => tick.toFixed(0)} // On affiche des entiers
      />
      <Tooltip formatter={(value) => value.toFixed(0)}/>
      <Legend />
      <Line type="monotone" dataKey="seuil" stroke="#8884d8" activeDot={{ r: 8 }} name={`Seuil ${lyceeNom}`} dot={true} />
      <Line
        type="linear"
        dataKey="regression"
        stroke="#FF0000"
        name="Tendance générale"
        dot={false}
        strokeWidth={2}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default GraphiqueSeuils;