const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrique', 'Fée']

/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
          notNull: { msg: 'Le nom est une propriété requise.' },
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de vie." },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égaux à 999."
          },
          notNull: { msg: "Les points de vie sont une propriété requise." }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de dégâts." },
          min: {
            args: [0],
            msg: "Les points de dégâts doivent être supérieurs ou égaux à 0."
          },
          max: {
            args: [999],
            msg: "Les points de dégâts doivent être inférieurs ou égaux à 99."
          },
          notNull: { msg: "Les points de vie sont une propriété requise." }
        }
        
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
          notNull: { msg: "L'image est une propriété requise." }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokémon doit avoir au moins un type.')
            }
            if(value.split(',').lenght > 3) {
              throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
        // Getter : Base de données -> API Rest
        // "Plante, Poison".split(',') => ["Plante", "Poison"]
        // Setter : API Rest -> Base de données
        // ["Plante", "Poison"].join() => "Plante, Poison"
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }