const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
     id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false, 
      primaryKey: true
    },
    IDBDatabase: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    weight:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    life_span:{
      type: DataTypes.STRING
    },
    url_image:{
      type: DataTypes.STRING,
    },
    createInDb:{
      type : DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
    }
  },{
    timestamps: false,
  });
};
