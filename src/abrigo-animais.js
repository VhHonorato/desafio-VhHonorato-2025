import { animais } from "../animais.js";
import { arraysIguaisENaOrdem, adotouMaisDeTres, podeAdotarGato } from "../utilitarios.js";


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
      
      // Lógica Adoção
      const resultadoFinal = [];
      const animaisAdotadosPessoa1 = [];
      const animaisAdotadosPessoa2 = [];
    
      console.log(animaisAdotadosPessoa1);
      console.log(animaisAdotadosPessoa2);
      for(const nomeAnimal of listaAnimais){
        const brinquedosFavoritos = animais[nomeAnimal].brinquedos;
        const especieAnimal = animais[nomeAnimal].especie;

        const pessoaApta1 = arraysIguaisENaOrdem(brinquedosFavoritos, listaBrinquedosPessoa1);
        const pessoaApta2 = arraysIguaisENaOrdem(brinquedosFavoritos, listaBrinquedosPessoa2);

        //Regra 4 - No caso de as duas pessoas serem aptas a adoção. E atende tambem a condição de as duas !aptas.
        if(pessoaApta1 === pessoaApta2){
           resultadoFinal.push(`${nomeAnimal} - abrigo`)
         
           continue;
        }
        if(pessoaApta1){
            //Regra 3 - Se já houver um animal adotado com pelo menos um dos brinquedos favoritos iguais ao do gato em questão, os dois não poderão ser adotados pela mesma pessoa e prevalce quem foi escolhido primeiro.
            // Regra 5 - Uma pessoa não pode adotar mais de 3 animais.
          if(especieAnimal === 'gato'){
          
            if (!podeAdotarGato(nomeAnimal, animaisAdotadosPessoa1) || adotouMaisDeTres(animaisAdotadosPessoa1)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
            
            } else{
              animaisAdotadosPessoa1.push({nome: nomeAnimal, especie: especieAnimal});
              resultadoFinal.push(`${nomeAnimal} - pessoa 1}`);
              
            }
           
          } else {
            if(adotouMaisDeTres(animaisAdotadosPessoa1)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              continue;
              
            } else {
              animaisAdotadosPessoa1.push({nome: nomeAnimal, especie: animais[nomeAnimal].especie});
              resultadoFinal.push(`${nomeAnimal} - pessoa 1`);
            
            }          
            
          } 
          continue;
        }

        if(pessoaApta2){
           // Atendendo a regra 3, se já houver um animal adotado com pelo menos um dos brinquedos favoritos iguais ao do gato em questão, os dois não poderão ser adotados pela mesma pessoa e prevalce quem foi escolhido primeiro.
            // Regra 5 - Uma pessoa não pode adotar mais de 3 animais.
          if(animais[nomeAnimal].especie === 'gato'){ 
           
            if(!podeAdotarGato(nomeAnimal, animaisAdotadosPessoa2) || adotouMaisDeTres(animaisAdotadosPessoa2)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              
            } else {
              animaisAdotadosPessoa2.push({nome: nomeAnimal, especie: especieAnimal});
              resultadoFinal.push(`${nomeAnimal} - pessoa 2`);  
         
            }
         } else {
            if(adotouMaisDeTres(animaisAdotadosPessoa2)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              
            } else {
              animaisAdotadosPessoa2.push({nome: nomeAnimal, especie: especieAnimal});
              resultadoFinal.push(`${nomeAnimal} - pessoa 2`);
            
            }
          }
          continue;
        }
        
    
      }
      
        return { lista: resultadoFinal.sort() };
    }catch (error) {
      return { erro: 'Ocorreu um erro inesperado no processamento.' };
    }
  }
}


//export { AbrigoAnimais as AbrigoAnimais };

// Linha para teste rápido durante o desenvolvimento

const resultadoTeste = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'LASER,SKATE,RATO,BOLA,CAIXA,NOVELO', 'Rex,Bola,Bebe,Loco');
console.log('Resultado do teste rápido:', resultadoTeste);


