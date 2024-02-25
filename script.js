//sera usado como chave para armazenar e recuperar os dados da lista no armazenamento local do navegador
const localStorageKey = 'to-do-list'

//funçao quando chamada adicionar uma nova tarefa
function nvTarefa(){
    let input = document.getElementById("input-tarefa");
    
    //validação de campo se estar vazio ou preenchido
    if(!input.value){
        alert("OPS! não a nada para inserir a sua lista")
    }else if(valiNvTarefa()){
        alert("Ja exite uma tarefa com esse nome")
    }
    else{
        //incremento no localStorage
        let valor = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        valor.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(valor))
        mostraValor()
    }
    input.value = ""
}
// funçao que valida se existe tarefas na losta de tarefas
function valiNvTarefa(){
    let valor = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValor = document.getElementById("input-tarefa").value
    let exist = valor.find(x =>x.name == inputValor)
    return !exist ? false : true
}

//exibe a tarefa na tela
function mostraValor(){
    let valor = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('list')
    //minha lista começa vazia
    list.innerHTML = ''

    for(let i = 0; i < valor.length; i++){

        list.innerHTML += `<li>${valor[i]['name']}<button id ='btn-ok' onclick = 'removeItem("${valor[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`
    }
}
//remove a tarefa ao clicar no botao
function removeItem(data){
    let valor = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = valor.findIndex(x =>x.name == data)
    valor.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(valor))
    mostraValor()
}


mostraValor()