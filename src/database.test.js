import Cats from "./cats/cats.model";
import initDatabase from "./database";
import { Persons } from "./persons/persons.model";

describe("Model relations", () => {
  beforeEach(async () => {
    // You will need this to associate models
    await initDatabase().sync();

    Cats.destroy({ cascade: true, truncate: true });
    Persons.destroy({ cascade: true, truncate: true });

    await Persons.create({
      id: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
      name: "Nat",
      birthYear: new Date("1945-09-02")
    });

    // If you omit PersonId, sequelize will complain
    // "Cats" violates foreign key constraint "Cats_PersonId_fkey"
    await Cats.bulkCreate([
      {
        id: "d0c4a122-81ab-46ed-8242-f18f2d6f81fc",
        PersonId: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
        name: "Tomtom",
        birthYear: new Date("2010-01-10")
      },
      {
        id: "ffc58cf5-32a5-498c-9d01-e8c35fd51761",
        PersonId: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
        name: "Steaky",
        birthYear: new Date("2010-01-10")
      },
      {
        id: "1b2bd3e4-677c-4c33-98af-99c8195e2036",
        PersonId: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
        name: "Zorro",
        birthYear: new Date("2010-01-10")
      }
    ]);
  });

  it("can get Cat's people", async () => {
    const cat = await Cats.findOne({
      where: {
        id: "d0c4a122-81ab-46ed-8242-f18f2d6f81fc"
      },
      include: [{
        model: Persons,
        as: "Person",
        attributes: [
          "name"
        ]
      }]
    });
    expect(cat.toJSON()).toEqual(expect.objectContaining({
      id: "d0c4a122-81ab-46ed-8242-f18f2d6f81fc",
      name: "Tomtom",
      birthYear: new Date("2010-01-10"),
      PersonId: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
      Person: {
        name: "Nat"
      }
    }));
  });

  it("can get Person's cats", async () => {
    const person = await Persons.findOne({
      where: {
        id: "eabcaaf5-8781-49c3-8e1a-955a0068c07f"
      },
      include: [{
        model: Cats,
        as: "Cats",
        attributes: [
          "id",
          "name"
        ]
      }]
    });
    expect(person.toJSON()).toEqual(expect.objectContaining({
      id: "eabcaaf5-8781-49c3-8e1a-955a0068c07f",
      name: "Nat",
      birthYear: new Date("1945-09-02"),
      Cats: [
        { name: "Tomtom", id: "d0c4a122-81ab-46ed-8242-f18f2d6f81fc" },
        { name: "Steaky", id: "ffc58cf5-32a5-498c-9d01-e8c35fd51761" },
        { name: "Zorro", id: "1b2bd3e4-677c-4c33-98af-99c8195e2036" }
      ]
    }));
  });
});
