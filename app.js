const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const musiquesRoutes = require('./routes/musiques-routes');

app.use('/api/musiques', musiquesRoutes);

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({message: error.message || 'Une erreur non gérée est survenue'});
});

const uri = `mongodb+srv://gretaUser:sUPXIReA7FnjdSQZ@cluster0.ncwlp.mongodb.net/Greta?retryWrites=true&w=majority`

const options = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(uri, options)
.then(() => {
    app.listen(5000, console.log("server running"));
})
.catch(err => {
    console.log(err);
});

//test laurent