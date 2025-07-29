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
    
    assert.equal(nombre1.toNumber(), 10);
    assert.equal(nombre2.toNumber(), 20);
  });

  it("should calculate addition1 correctly", async () => {
    const result = await exercice1Instance.addition1();
    assert.equal(result.toNumber(), 30);
  });

  it("should calculate addition2 correctly", async () => {
    const result = await exercice1Instance.addition2(15, 25);
    assert.equal(result.toNumber(), 40);
  });

  it("should update nombre1", async () => {
    await exercice1Instance.setNombre1(50);
    const nombre1 = await exercice1Instance.nombre1();
    assert.equal(nombre1.toNumber(), 50);
  });
});