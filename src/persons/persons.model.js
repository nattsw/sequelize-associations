import { Model, DataTypes } from "sequelize";

export class Persons extends Model {
}

export const initPersons = (sequelize) => {
  Persons.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    birthYear: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Persons",
    freezeTableName: true
  });

  return [Persons, models => models.Persons.hasMany(models.Cats)];
};
