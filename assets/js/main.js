const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const AnswerInput = document.getElementById("result");

//Essas são as teclas q quero q o usuário digite
const allowKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Para todos os elementos q tem a classe .key, estou executando uma função com o forEach
document.querySelectorAll(".key").forEach(function (valueKey) {
    //estou executando uma função click em cada elemento
    valueKey.addEventListener("click", function () {
        //Estou coletando o valor q esta no data do elemento
        const value = valueKey.dataset.value;
        //Estou acrescentando esse valor no input
        input.value += value
    })
})

//Estou criando a função do botão "C"(clear) da calculadora
document.getElementById("clear").addEventListener("click", function () {
    //Toda vez q ele for pressionado será limpo o valor do input
    input.value = ""
    //Com isso, o input receberá um foco quando a função for executada
    input.focus()
})

input.addEventListener("keydown", function (ev) {
    //Estou tirando o comportamento padrão desse evento, q seria ele incluir automaticamente a tecla quando pressioanada
    ev.preventDefault()

    //Esse if esta verificando se no array allowKeys, esta incuido a tecla q o usuário clicou q seria o ev.key (a chave do evento, já q o evento é iniciado quando uma tecla é clicada(key))
    if (allowKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }

    if (ev.key === "Backspace") {
        //Com o slice, estou cortando o valor do input, então esta sendo colatadao desda posição 0(inicial) até a posição -1(penúltima), com isso o último valor q foi digitado vai ser apagado
        input.value = input.value.slice(0, -1)
    }

    if (ev.key === "Enter") {
        math()
    }
})

document.getElementById("equal").addEventListener("click", math)

function math() {
    //A função irá ser iniciada com esse valor e classe
    AnswerInput.value = "Error"
    AnswerInput.classList.add("error")

    //A função eval irá avaliar oq o usuário digitou, como se tivesse no console do navegador , por exemplo se colocasse no console = 10 + 10, ele avaliaria e devolveria 20, o eval faz a mesma coisa. Mas é uma função perigosa pq pode possibilitar um usuário mal intecionado a inserir algum comando js e com isso tem a chance de ser algum vírus, pois o eval irá executá-lo

    //Mas caso n dê erro, o eval será iniciado e colocará o valor do resultado, mas caso dê erro, vai aparecer apenas o value ="Error" e a clase q foi adicionada, pq o eval n conseguiu resolver oq o usuário colocou, por conta disso a execução irá parar aqui
    const result = eval(input.value);
    AnswerInput.value = result
    //Caso o eval dê certo, a classe será removida, e o resultado será mostrado mas a classe vai ser removida tão rapido q n vai da para ver a cor
    AnswerInput.classList.remove("error")

}

document.getElementById("themeSwitcher").addEventListener("click", function () {
    //Estou verificando se o data do main esta igual o dark, caso ele esteja e a pessoa clique no botão para trocar, ele será alterado abaixo
    if (main.dataset.theme === "dark") {
        //Estou usando o elemento root do css, é aquele q esta armazendo as variaves de cor do css, estou indo no style delee e aplicando uma propriedade, q no caso estou indo na propriedade/variavel "--bg-color" e inserindo a cor branca, os outros seguem o mesmo padrão
        root.style.setProperty("--bg-color", "white")
        root.style.setProperty("--primary-color", "black")
        root.style.setProperty("--font-color", "black")
        //Agora estou colocando no data, o theme 
        main.dataset.theme = "light"
    } else {
        //Caso esteja no the light, será colocado essas corea
        root.style.setProperty("--bg-color", "#141414")
        root.style.setProperty("--primary-color", "#bd3927")
        root.style.setProperty("--font-color", "#f1f5f9")
        //depois será alterado no data para dark
        main.dataset.theme = "dark"
    }
})

document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
    //Estou meio q coletando o botão q inicia o evento
    const buttonCopy = ev.currentTarget;
    //Se ele estiver com o texto Copy
    if (buttonCopy.innerText === "Copy") {
        //Sera troca o texto para copied e será adicionado uma classe
        buttonCopy.innerText = "Copied";
        buttonCopy.classList.add("success")
        //Usando a propriedade navigator + clipboard(área de tranferência)+ writerText, será copiado oq estã na variável Answerinout.value
        navigator.clipboard.writeText(AnswerInput.value);
    } else {
        buttonCopy.innerText = "Copy"
        buttonCopy.classList.remove("success")
    }
})
