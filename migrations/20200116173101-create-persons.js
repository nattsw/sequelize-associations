module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Persons", {
    id: {
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
      type: Sequelize.UUID
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    birthYear: {
      allowNull: false,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable("Persons")
};
