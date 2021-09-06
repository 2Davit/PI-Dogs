const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      original: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        defaultValue: "No data",
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "No data",
      },
      minHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      maxHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      minWeight: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      maxWeight: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      lifeSpan: {
        type: DataTypes.STRING,
        defaultValue: "No data",
      },
      bredFor: {
        type: DataTypes.STRING,
        defaultValue: "No data",
      },
      temperament: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
