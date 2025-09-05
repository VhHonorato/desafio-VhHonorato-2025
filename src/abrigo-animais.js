import { animais } from "../animais.js";


export class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      // --- VALIDAÇÃO DE ENTRADAS ---

      // Validação de Animais
      const listaAnimais = ordemAnimais.split(',');
      const animalInvalido = listaAnimais.find(animal => !animais[animal]);
      const temAnimalDuplicado = new Set(listaAnimais).size !== listaAnimais.length;

      if(animalInvalido || temAnimalDuplicado) {
        return { erro: 'Animal inválido' };
      }

      // Validação de Brinquedos
      const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
      const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');

      const listaBrinquedosValidos = new Set(Object.values(animais).flatMap(animal => animal.brinquedos));
      const brinquedoInvalido = [...listaBrinquedosPessoa1, ...listaBrinquedosPessoa2].find(brinquedo => !listaBrinquedosValidos.has(brinquedo));
      const brinquedoDplicadoPessoa1 = new Set(listaBrinquedosPessoa1).size !== listaBrinquedosPessoa1.length;
      const brinquedoDplicadoPessoa2 = new Set(listaBrinquedosPessoa2).size !== listaBrinquedosPessoa2.length;
      
      if(brinquedoInvalido || brinquedoDplicadoPessoa1 || brinquedoDplicadoPessoa2){
        return { erro: 'Brinquedo inválido' };

      }
      
    } catch (error) {
      return { erro: 'Ocorreu um erro inesperado no processamento.' };
    }
  }
}


//export { AbrigoAnimais as AbrigoAnimais };

// Linha para teste rápido durante o desenvolvimento

const resultadoTeste = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,PENA', 'Rex,Fofo');
console.log('Resultado do teste rápido:', resultadoTeste);

