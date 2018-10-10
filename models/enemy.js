module.exports = function (sequelize, DataTypes) {
  var Enemy = sequelize.define("Enemy", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    img: {
      type: DataTypes.STRING
    },
    hat: {
      type: DataTypes.INTEGER
    },
    torso: {
      type: DataTypes.INTEGER
    },
    leg: {
      type: DataTypes.INTEGER
    },
    wings: {
      type: DataTypes.INTEGER
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boss:{
      type: DataTypes.INTEGER
    }
  });
  return Enemy;
};