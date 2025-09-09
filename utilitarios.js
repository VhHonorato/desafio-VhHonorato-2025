import { animais } from "./animais.js";

/** 
 * Compara dois arrays para ver se são identicos em conteúdo e ordem.
 * @param {Array<string>} brinquedosAnimal A lista dos brinquedos preferidos do animal.
 * @param {Array<string>} brinquedosPessoa A lista dos brinquedos oferecidos pela pessoa. 
 * @returns {boolean} 'true' se o array com os brinquedos da pessoa estiverem com conteúdo e ordem corretos.
 */
function brinquedosIguaisENaOrdem(brinquedosAnimal, brinquedosPessoa) {
    let indiceAnimal = 0;
    for (let indicePessoa = 0; indicePessoa < brinquedosPessoa.length; indicePessoa++){
        if(brinquedosAnimal[indiceAnimal] === brinquedosPessoa[indicePessoa]){
            indiceAnimal++;
        }
        if(indiceAnimal === brinquedosAnimal.length){
            return true;
        }
    }
    return false;
}

/**
 * Verifica se o numero de animais adotados ultrapassa o limite permitido.
 * @param {Array<Object>} animaisAdotadosPessoa A lista de animais já adotados.
 * @returns {boolean} 'true' se o gato pode ser adotado, `false` caso contrário.
 */
function adotouMaisDeTres(animaisAdotadosPessoa){
    if(animaisAdotadosPessoa.length >= 3){
        return true;

    }
    return false;
}


/**
 * Verifica se um gato pode ser adotado, checando conflito de brinquedos.
 * @param {string} nomeAnimal O nome do gato a ser verificado.
 * @param {Array<Object>} animaisAdotadosPessoa A lista de animais já adotados.
 * @returns {boolean} 'true' se o gato pode ser adotado, `false` caso contrário.
 */
function podeAdotarGato(nomeAnimal, animaisAdotadosPessoa, pessoaApta){
    if(!pessoaApta){
        return false;
    }
    if(animais[nomeAnimal].especie === 'gato'){
        const brinquedoGatoAtual = new Set(animais[nomeAnimal].brinquedos);
        if(animaisAdotadosPessoa.length < 1){
            return true;
        }
        for(const animal of animaisAdotadosPessoa){
            const brinquedoAnimalAdotado = animais[animal.nome].brinquedos;
            const compartilhaBrinquedo = brinquedoAnimalAdotado.some(brinquedo =>brinquedoGatoAtual.has(brinquedo));
            if(compartilhaBrinquedo){
                return false;
            }else{
                return true;
            }
        }
        
    } else if(animais[nomeAnimal].especie !== 'gato'){
        const brinquedoAnimalAtual = new Set(animais[nomeAnimal].brinquedos);
        if(animaisAdotadosPessoa.length < 1){
            return true;
        }
        for(const animal of animaisAdotadosPessoa){
            if(animal.especie === 'gato'){    
                const brinquedoGatoAdotado = animais[animal.nome].brinquedos;
                const compartilhaBrinquedo = brinquedoGatoAdotado.some(brinquedo =>brinquedoAnimalAtual.has(brinquedo));
                if(compartilhaBrinquedo){
                return false;
                } else {
                     return true;
                }
                  
            }
          
        }
    }
    
   
}

/** 
 * Verifica se Loco pode ser adotado, checando se existe os brinquedos preferidos, independente da ordem, e se ele não vai ser adotado sozinho.
 * @param {string} nomeAnimal O nome do animal a ser verificado.
 * @param {Array<Object>} animaisAdotadosPessoa A lista de animais já adotados.
 * @param {Array<string>} brinquedosAnimal A lista dos brinquedos preferidos do animal.
 * @param {Array<string>} brinquedosPessoa A lista dos brinquedos oferecidos pela pessoa. 
 * @returns {boolean} 'true' se o array com os brinquedos da pessoa estiverem com conteúdo e ordem corretos.
 */
function podeAdotarLoco(nomeAnimal,animaisAdotadosPessoa, brinquedosAnimal, brinquedosPessoa){
    const brinquedoPessoa = new Set(brinquedosPessoa);
    const temTodosOsBrinquedos = brinquedosAnimal.every(b => brinquedoPessoa.has(b));
    if (nomeAnimal !== 'Loco') {
        return false;
    }

    // Regra 6.2: Loco precisa de companhia.
    if (animaisAdotadosPessoa.length < 1) {
        return false;
    } else if (temTodosOsBrinquedos){  //  A pessoa deve ter todos os brinquedos do Loco, sem se importar com a ordem.
        return true;
    }

   
    

}

/** 
 * Verifica se Loco pode ser adotado, checando se existe os brinquedos preferidos, independente da ordem, e se ele não vai ser adotado sozinho.
 * @param {string} nomeAnimal O nome do animal a ser verificado.
 * @param {Array<Object>} animaisAdotadosPessoa A lista de animais já adotados.
 * @returns {boolean} 'true' se o array com os brinquedos da pessoa estiverem com conteúdo e ordem corretos.
 */

function podeAdotarComGato (nomeAnimal, animaisAdotadosPessoa){
    const brinquedosAnimalAtual = new Set(animais[nomeAnimal].brinquedos);
    const temGatoAdotado = animaisAdotadosPessoa.filter(animal => animal.especie === 'gato');
    if(temGatoAdotado){
        const compartilhaBrinquedo = animais[temGatoAdotado.nome].brinquedos.some(brinquedo => brinquedosAnimalAtual.has(brinquedo));
        if(compartilhaBrinquedo){
            return false;
        } else {
            return true;
        }
    }

    return false;
}


export { 
    brinquedosIguaisENaOrdem,
    adotouMaisDeTres,
    podeAdotarGato,
    podeAdotarLoco,
    podeAdotarComGato  
 
}