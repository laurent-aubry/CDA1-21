const express = require('express');

const app = express();

app.use(express.json());

const musiquesRoutes = require('./routes/musiques-routes');

app.use('/api/musiques', musiquesRoutes);

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({message: error.message || 'Une erreur non gérée est survenue'});
});

app.listen(5000);