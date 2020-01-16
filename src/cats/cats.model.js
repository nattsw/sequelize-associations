import { Model, DataTypes } from "sequelize";

export default class Cats extends Model {
}

export const initCats = (sequelize) => {
  Cats.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    PersonId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    birthYear: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Cats",
    freezeTableName: true
  });

  return [Cats, models => models.Cats.belongsTo(models.Persons, { as: "Person", foreignKey: "PersonId" })];
};
