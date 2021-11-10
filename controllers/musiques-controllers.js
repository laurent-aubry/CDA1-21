// const { v4: uuidv4 } = require('uuid');
const Musique = require("../models/musique");

let MUSIQUES = [
  {
    id: "1",
    auteur: "Daft Punk",
    annee: 2013,
    titre: "Get lucky",
    imageUrl:
      "https://cdn-www.konbini.com/fr/images/files/2013/12/get-lucky-daft-punk.png",
  },
  {
    id: "2",
    auteur: "David Guetta ft Sia",
    annee: 2011,
    titre: "Titanium",
    imageUrl:
      "https://images-eu.ssl-images-amazon.com/images/I/51cQ8TfyqJL._SX342_QL70_ML2_.jpg",
  },
  {
    id: "3",
    auteur: "Shaka Ponk",
    annee: 2019,
    titre: "Smells like teen spirits",
    imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg",
  },
  {
    id: "4",
    auteur: "Imagine Dragon",
    annee: 2018,
    titre: "Natural",
    imageUrl:
      "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg",
  },
];

const getMusiques = async (req, res, next) => {
  let musiques
  try {
    musiques = await Musique.find();
  } catch(err){
    console.log(err);
    res.status(404).json({message: "Erreur de traitement"})
  }
  res.status(200).json({ musiques: musiques.map( m => m.toObject({getters: true})) });
};

const getMusiqueById = async (req, res, next) => {
  const mId = req.params.musiqueId;
  let musique
  try{
    musique = await Musique.findById(mId)
  } catch(err){
    console.log(err);
    res.status(404).json({message: "Erreur de lors de la récupération de la musique"})
  }

  if (!musique) {
    return res
      .status(404)
      .json({ message: "Musique non trouvée pour cet identifiant" });
  }
  res.status(200).json({ musique: musique.toObject({getters: true})  });
};

const createMusique = async (req, res, next) => {
    const { auteur, annee, titre, imageUrl } = req.body;
  // console.log(req.body);
    const createdMusique = new Musique ({
        // id: uuidv4(),
        auteur,
        annee ,
        titre,
        imageUrl
    });
    // console.log(createdMusique);
    // MUSIQUES.push(createdMusique);
    try {
      await createdMusique.save();
    } catch(err){
      console.log(err);
      res.status(500).json({message: "Erreur lors de l'ajout de la musique"})
    }
  res.status(201).json({musique: createdMusique});
  // res.status(201).json({musique: "enregistrement effectué"});
  };

  const updateMusique = async (req, res, next) =>{
    const { auteur, annee, titre, imageUrl } = req.body;
    const musiqueId = req.params.musiqueId;

    let musique;
    try {
      musique = await Musique.findById(musiqueId);
    } catch(err){
      console.log(err);
      res.status(500).json({message: "Erreur lors de la récupétaion de la musique"})
    }


    musique.auteur = auteur;
    musique.annee = annee;
    musique.titre = titre;
    musique.imageUrl = imageUrl;

    try {
      await musique.save();
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Erreur lors de la mise à jour de la musique"})

    }

    res.status(200).json({ musique: musique.toObject({getters: true}) });

};

const deleteMusique = async (req, res, next) => {
    const musiqueId = req.params.musiqueId;
    // MUSIQUES = MUSIQUES.filter(m => m.id !== musiqueId);
    let musique;
    try {
      musique = await Musique.findById(musiqueId);
    } catch(err){
      console.log(err);
      res.status(500).json({message: "Erreur lors de la récupération de la musique"})
    }

    if(!musique){
      console.log(err);
      res.status(500).json({message: "Erreur lors de la récupération de la musique"})
    }

    try{
      await musique.remove();
    } catch(err){
      console.log(err);
      res.status(500).json({message: "Erreur lors de la suppression de la musique"})
    }

    res.status(200).json({ message: "Musique supprimée !" })
  }

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
exports.deleteMusique = deleteMusique;
