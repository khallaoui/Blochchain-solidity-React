// test/TestExercice1.js
const Exercice1 = artifacts.require("Exercice1");

contract("Exercice1", (accounts) => {
  let exercice1Instance;

  beforeEach(async () => {
    exercice1Instance = await Exercice1.new(10, 20);
  });

  it("should initialize with correct values", async () => {
    const nombre1 = await exercice1Instance.nombre1();
    const nombre2 = await exercice1Instance.nombre2();
    
    assert.equal(nombre1.toNumber(), 10, "Nombre1 should be 10");
    assert.equal(nombre2.toNumber(), 20, "Nombre2 should be 20");
  });

  it("should calculate addition1 correctly", async () => {
    const result = await exercice1Instance.addition1();
    assert.equal(result.toNumber(), 30, "Addition1 should return 30");
  });

  it("should calculate addition2 correctly", async () => {
    const result = await exercice1Instance.addition2(15, 25);
    assert.equal(result.toNumber(), 40, "Addition2 should return 40");
  });

  it("should update nombre1", async () => {
    await exercice1Instance.setNombre1(50);
    const nombre1 = await exercice1Instance.nombre1();
    assert.equal(nombre1.toNumber(), 50, "Nombre1 should be updated to 50");
  });

  it("should update nombre2", async () => {
    await exercice1Instance.setNombre2(100);
    const nombre2 = await exercice1Instance.nombre2();
    assert.equal(nombre2.toNumber(), 100, "Nombre2 should be updated to 100");
  });

  it("should calculate addition1 after updates", async () => {
    await exercice1Instance.setNombre1(25);
    await exercice1Instance.setNombre2(35);
    const result = await exercice1Instance.addition1();
    assert.equal(result.toNumber(), 60, "Addition1 should return 60 after updates");
  });
});