/** 
 * Compara dois arrays para ver se são identicos em conteúdo e ordem.
 * @param {Array<string>} brinquedosAnimal A lista dos brinquedos preferidos do animal.
 * @param {Array<string>} brinquedosPessoa A lista dos brinquedos oferecidos pela pessoa. 
 * @returns {boolean} Verdadeiro se o array com os brinquedos da pessoa estiverem com conteúdo e ordem corretos.
 */
import { animais } from "./animais.js";

function arraysIguaisENaOrdem(brinquedosAnimal, brinquedosPessoa) {
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

function adotouMaisDeTres(quantidadeAdotada){
    if(quantidadeAdotada.length >= 3){
        return true;

    }
    return false;
}

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

export { 
    arraysIguaisENaOrdem,
    adotouMaisDeTres,
    podeAdotarGato  
 
}