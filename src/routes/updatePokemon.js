const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
      .catch(error => {
        const message = 'Le pokémon n\'a pas pu être récupéré. Réessayez dans quelques instants.'
        res.statut(500).json({message, data: error})
      })
    })
  })
}