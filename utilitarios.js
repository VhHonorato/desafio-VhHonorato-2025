/** 
 * Compara dois arrays para ver se são identicos em conteúdo e ordem.
 * @param {Array<string>} brinquedosAnimal A lista dos brinquedos preferidos do animal.
 * @param {Array<string>} brinquedosPessoa A lista dos brinquedos oferecidos pela pessoa. 
 * @returns {boolean} Verdadeiro se o array com os brinquedos da pessoa estiverem com conteúdo e ordem corretos.
 */

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

export { 
    arraysIguaisENaOrdem 
}