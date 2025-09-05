import { animais } from "../animais.js";

export class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const listaAnimais = ordemAnimais.split(',');
      const animalInvalido = listaAnimais.find(animal => !animais[animal]);
      
      if(animalInvalido) {
        return { erro: 'Animal inválido' };
      }
    } catch (error) {
      return { erro: error.message}
    }
}
}



//export { AbrigoAnimais as AbrigoAnimais };

const resultadoTeste = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Lulu');
console.log('Resultado do teste rápido:', resultadoTeste);

