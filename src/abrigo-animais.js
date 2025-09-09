import { animais } from "../animais.js";
import { brinquedosIguaisENaOrdem, adotouMaisDeTres, podeAdotarGato, podeAdotarLoco, podeAdotarComGato } from "../utilitarios.js";


 class AbrigoAnimais {
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
  
      for(const nomeAnimal of listaAnimais){
        const brinquedosFavoritos = animais[nomeAnimal].brinquedos;
        const especieAnimal = animais[nomeAnimal].especie;

        //Regra 1 e 2 - Valida se os brinquedos são os favoritos e estão na ordem, mesmo que intercalados com outros brinquedos.
        const pessoaApta1 = brinquedosIguaisENaOrdem(brinquedosFavoritos, listaBrinquedosPessoa1);
        const pessoaApta2 = brinquedosIguaisENaOrdem(brinquedosFavoritos, listaBrinquedosPessoa2);
        //Regra 6 - Valida as regras para adotar Loco.
        const pessoa1AdotaLoco = podeAdotarLoco(nomeAnimal, animaisAdotadosPessoa1, brinquedosFavoritos, listaBrinquedosPessoa1);
        const pessoa2AdotaLoco = podeAdotarLoco(nomeAnimal, animaisAdotadosPessoa2, brinquedosFavoritos, listaBrinquedosPessoa2);
        

        //Regra 4 - No caso de as duas pessoas serem aptas a adoção. E atende tambem a condição de as duas !aptas.
        if(pessoaApta1 && pessoaApta2){
           resultadoFinal.push(`${nomeAnimal} - abrigo`)
         
           continue;
        }
        if(pessoaApta1 || pessoa1AdotaLoco || podeAdotarGato(nomeAnimal, animaisAdotadosPessoa1, pessoaApta1)){
            //Regra 3 - Se já houver um animal adotado com pelo menos um dos brinquedos favoritos iguais ao do gato em questão, os dois não poderão ser adotados pela mesma pessoa e prevalce quem foi escolhido primeiro.
            // Regra 5 - Uma pessoa não pode adotar mais de 3 animais.
          if(especieAnimal === 'gato'){
          
            if (!podeAdotarGato(nomeAnimal, animaisAdotadosPessoa1, pessoaApta1) || adotouMaisDeTres(animaisAdotadosPessoa1)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              continue;
            
            } else{
              animaisAdotadosPessoa1.push({nome: nomeAnimal, especie: especieAnimal});
              resultadoFinal.push(`${nomeAnimal} - pessoa 1`);
              continue;
              
            }
           
          } else {
              if(adotouMaisDeTres(animaisAdotadosPessoa1)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              continue;
             

            // Regra 6   
              } else if(pessoa1AdotaLoco && podeAdotarGato(nomeAnimal, animaisAdotadosPessoa1, pessoaApta1)) {
              animaisAdotadosPessoa1.push({nome: nomeAnimal, especie: animais[nomeAnimal].especie});
              resultadoFinal.push(`${nomeAnimal} - pessoa 1`);
              continue;
              

              } else if(podeAdotarGato(nomeAnimal, animaisAdotadosPessoa1, pessoaApta1)){
                animaisAdotadosPessoa1.push({nome: nomeAnimal, especie: animais[nomeAnimal].especie});
                resultadoFinal.push(`${nomeAnimal} - pessoa 1`);
                continue;

              } else{
                resultadoFinal.push(`${nomeAnimal} - abrigo`);
                continue;
              }
              
            }           
             
        } 
              

        if(pessoaApta2 || pessoa2AdotaLoco || podeAdotarGato(nomeAnimal, animaisAdotadosPessoa2, pessoaApta2)){
           // Atendendo a regra 3, se já houver um animal adotado com pelo menos um dos brinquedos favoritos iguais ao do gato em questão, os dois não poderão ser adotados pela mesma pessoa e prevalce quem foi escolhido primeiro.
            // Regra 5 - Uma pessoa não pode adotar mais de 3 animais.
          if(animais[nomeAnimal].especie === 'gato'){ 
           
            if(!podeAdotarGato(nomeAnimal, animaisAdotadosPessoa2, pessoaApta2) || adotouMaisDeTres(animaisAdotadosPessoa2)){
              resultadoFinal.push(`${nomeAnimal} - abrigo`);
              continue;
              
            } else {
              animaisAdotadosPessoa2.push({nome: nomeAnimal, especie: especieAnimal});
              resultadoFinal.push(`${nomeAnimal} - pessoa 2`);
              continue;  
         
            }
          } else {
              if(adotouMaisDeTres(animaisAdotadosPessoa2)){
                resultadoFinal.push(`${nomeAnimal} - abrigo`);
                continue;    
              
              } else if(pessoa2AdotaLoco) {
                
                  animaisAdotadosPessoa2.push({nome: nomeAnimal, especie: animais[nomeAnimal].especie});
                  resultadoFinal.push(`${nomeAnimal} - pessoa 2`);
                  continue;
                               

                } else {
                  animaisAdotadosPessoa2.push({nome: nomeAnimal, especie: animais[nomeAnimal].especie});
                  resultadoFinal.push(`${nomeAnimal} - pessoa 2`);
                  continue;
              
                }
          }      
          
        }
          resultadoFinal.push(`${nomeAnimal} - abrigo`);
          continue;
        
        }
      
      return { lista: resultadoFinal.sort() };
      
    } catch (error) {
      return { erro: 'Ocorreu um erro inesperado no processamento.' };
    }
  }
}


export { AbrigoAnimais as AbrigoAnimais };

// Linha para teste rápido durante o desenvolvimento

const resultadoTeste = new AbrigoAnimais().encontraPessoas('RATO,BOLA',
      'RATO,NOVELO', 
      'Rex,Fofo');
console.log('Resultado do teste rápido:', resultadoTeste);


