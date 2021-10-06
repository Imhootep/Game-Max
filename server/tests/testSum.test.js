describe('Ceci est un test de test', function () {

  function sum(a, b) {
    return a + b
  }

  test('Somme de 1 et 2', () => {
    expect(sum(1,2)).toBe(3);
  });
})