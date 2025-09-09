import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO', 
      'RATO,BOLA', 
      'Lulu'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,NOVELO', 
      'Rex,Fofo'
    );
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal que tenha, na lista das interações possíveis, um gato que não divide brinquedos. (Com o gato sendo o primeiro, na ordem de interação)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER',     // Pessoa 1 adota Mimi primeiro. Mas não consegue adotar Rex por compartilhar brinquedo com Mimi
      'NOVELO,RATO',        //  Pessoa 2 não apta
      'Mimi,Fofo,Rex,Bola' //.  Ordem de interação
    );

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - abrigo');
      expect(resultado.lista[2]).toBe('Mimi - pessoa 1');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

    test('Deve encontrar pessoa para um animal que tenha, na lista das interações possíveis, um gato que não divide brinquedos. (Com o gato não sendo o primeiro, na ordem de interação)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER',
      'NOVELO,RATO,BOLA', 
      'Fofo,Rex,Mimi,Bola'
    );

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 1');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

    test('Deve rejeitar animal por duas pessoas, simultaneamente, atenderem a sua seleção de brinquedos favoritos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO,BOLA,LASER',
      'CAIXA,RATO,BOLA,NOVELO',
      'Rex,Bola,Mimi'
    );

      expect(resultado.lista[0]).toBe('Bola - pessoa 2');
      expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
      expect(resultado.lista[2]).toBe('Rex - abrigo');
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve permitir que Loco seja adotado se a pessoa tiver os brinquedos e companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',          // Pessoa 1 adota Rex primeiro
      'RATO,SKATE,CAIXA,NOVELO',  // Pessoa 2 tem os brinquedos do Loco e Bola
      'Rex,Bola,Loco'            // Ordem de interação
    );

    expect(resultado.lista[0]).toBe('Bola - pessoa 2');
    expect(resultado.lista[1]).toBe('Loco - pessoa 2');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir que Loco seja adotado se a pessoa não tiver companhia para ele', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', // Pessoa 1 tem os brinquedos do Loco, mas não adota mais ninguém
      'BOLA',       // Pessoa 2 não é apta
      'Loco'        // Ordem de interação
    );

    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });
});
