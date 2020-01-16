import { Sequelize } from "sequelize";
import config from "../config/config.json";
import { initPersons } from "./persons/persons.model";
import { initCats } from "./cats/cats.model";

const initDatabase = () => {
  const sequelize = new Sequelize(config.development);
  sequelize.authenticate();

  const modelsToInitialise = [
    initCats,
    initPersons
  ];

  const { models, associations } = modelsToInitialise.reduce((acc, initModel) => {
    const [model, modelAssociations] = initModel(sequelize);
    acc.models[model.name] = model;
    acc.associations.push(modelAssociations);
    return acc;
  }, { models: {}, associations: [] });

  associations.forEach((a) => { a(models); });
  return sequelize;
};

export default initDatabase;
