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
function podeAdotarGato(nomeAnimal, animaisAdotadosPessoa){
    const brinquedoGatoAtual = new Set(animais[nomeAnimal].brinquedos);
    for(const animal of animaisAdotadosPessoa){
        const brinquedoAnimalAdotado = new Set(animais[animal.nome].brinquedos);
        const compartilhaBrinquedo = brinquedoAnimalAdotado.some(brinquedo =>brinquedoGatoAtual.has(brinquedo));
        if(compartilhaBrinquedo){
            return false;
        }
    
    }
    return true;
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
    let indiceAnimal = 0;
    if(nomeAnimal === 'Loco'){      
        for(const brinquedo of brinquedosPessoa){
            const brinquedoValido = brinquedosAnimal.includes(brinquedo);
            if(brinquedoValido){
                indiceAnimal++;
            }
        }
        if(indiceAnimal !== brinquedosAnimal.length){
        return false;
        } else if (animaisAdotadosPessoa.length >= 1){
            return true;

        }
     
    } else {
        return false;
    }
}            
export { 
    brinquedosIguaisENaOrdem,
    adotouMaisDeTres,
    podeAdotarGato,
    podeAdotarLoco  
 
}