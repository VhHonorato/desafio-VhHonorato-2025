import { animais } from "../animais.js";


export class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const listaAnimais = ordemAnimais.split(',');
      const animalInvalido = listaAnimais.find(animal => !animais[animal]);
      const animalDuplicado = new Set(listaAnimais).size !== listaAnimais.length;
      
      if(animalInvalido || animalDuplicado) {
        return { erro: 'Animal inválido' };
      }
    } catch (error) {
      
      return { erro: 'Ocorreu um erro inesperado no processamento.' };
    }
  }
}


//export { AbrigoAnimais as AbrigoAnimais };

// Linha para teste rápido durante o desenvolvimento
const resultadoTeste = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Bola,Loco,Rex,Tobi');
console.log('Resultado do teste rápido:', resultadoTeste);

