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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 255]
      }
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
    }
  });
  return Enemy;
};