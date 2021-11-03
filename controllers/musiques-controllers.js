const { v4: uuidv4 } = require('uuid');
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
  res.json({ musiques });
};

const getMusiqueById = (req, res, next) => {
  const mId = req.params.musiqueId;
  const musique = MUSIQUES.find((m) => {
    return m.id === mId;
  });
  if (!musique) {
    return res
      .status(404)
      .json({ message: "Musique non trouvée pour cet identifiant" });
  }
  res.json({ musique });
};

const createMusique = (req, res, next) => {
    const { auteur, annee, titre, imageUrl } = req.body;
  console.log(req.body);
    const createdMusique = {
        id: uuidv4(),
        auteur,
        annee ,
        titre,
        imageUrl
    };
    console.log(createdMusique);
    MUSIQUES.push(createdMusique);
  res.status(201).json({musique: createdMusique});
  // res.status(201).json({musique: "enregistrement effectué"});
  };

  const updateMusique = (req, res, next) =>{
    const { auteur, annee, titre, imageUrl } = req.body;
    const musiqueId = req.params.musiqueId;

    const updatedMusique = { ...MUSIQUES.find((m) => {
        return m.id === musiqueId;
    }) };

    const musiqueIndex = MUSIQUES.findIndex(m => m.id === musiqueId);

    updatedMusique.auteur = auteur;
    updatedMusique.annee = annee;
    updatedMusique.titre = titre;
    updatedMusique.imageUrl = imageUrl;

    MUSIQUES[musiqueIndex] = updatedMusique;

    res.status(200).json({ musique: updatedMusique });

};

const deleteMusique = (req, res, next) => {
    const musiqueId = req.params.musiqueId;
    MUSIQUES = MUSIQUES.filter(m => m.id !== musiqueId);
    res.status(200).json({ message: "Musique supprimée !" })
  }

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
exports.deleteMusique = deleteMusique;
