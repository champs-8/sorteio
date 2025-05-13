const qtdTeam = document.getElementById('qtdTimes');
const qtdPeoples = document.getElementById('qtdpessoa');
const qtdPlayers = document.getElementById('qtdplayer');
const list = document.querySelector('.list');
const spanMult = document.querySelector('#multiply');

// verificar se há algum valor de times e pessoas por time
//para mostrar quantos jogadores poder ser listados

const multiply = {
    t : setInterval(() => {
        if(qtdTeam.value != '' && qtdPeoples.value != '') {
            //variavel que vai receber o valor
            let mult = Number(qtdTeam.value*qtdPeoples.value);
            document.querySelector('#multiply').innerHTML = `Serão ${mult} jogadores, divididos entre ${qtdTeam.value} times`;
        }
    }, 1000)
};



function teste() {
    let team = qtdTeam.value; //times
    let peoples = qtdPeoples.value; //pessoas por time
    let players = team*peoples //quantidade jogadores
    spanMult.style.display = 'flex';
    
    // codigo para parar a verificação
    if (players != '') {
        clearInterval(multiply.t);
    }
    //a partir da segunda gerada de lista sem atualização
    //será feito o comentario de jogadores manualmente
    if(spanMult.textContent == '') {
        spanMult.innerHTML = `Serão ${team*peoples} jogadores, divididos entre ${team} times`;
    }
    if(team == '' || peoples == ''){
        alert('Preencha todos os campos') //se tiver tudo preenchido, ta ok
    }else{

        //vai limpar a div lista e depois vai receber os valores novamente.
        list.innerHTML = '<h4 class="flex justify-center">Cadastre os jogadores</h4>';

        for (let i = 0; players > i; i++) {

            //mostrar o display da lista
            list.style.display = 'flex';

            //criando uma nova div para um novo jogador
            let newdiv = document.createElement('div');
            newdiv.setAttribute('class','player flex');
            newdiv.setAttribute('id',`player${i+1}`);
            list.appendChild(newdiv);

            //criando o input dentro da div que foi criada
            //recebendo os mesmo valores do que ja estava no html
            let newinput = document.createElement('input');
            newinput.setAttribute('type','text');
            newinput.setAttribute('class','namePlayer flex');
            newinput.setAttribute('id', `player${i+1}`);
            newinput.setAttribute('placeholder',`Jogador${i+1}`);
            newdiv.appendChild(newinput);
        }
        list.innerHTML += '<button id="sortear" onclick="sortear()">Sortear</button>'
    }
}
//limpar inputs
function limpar() {;
    qtdTeam.value = ''
    qtdPeoples.value = ''
    spanMult.innerHTML = '';
    //destivando as divs e sections com os jogadores      
    document.querySelector('.list').style.display = 'none';
    document.querySelector('.sorteados').style.display = 'none';
    //ativar novamente o botão gerar lista
    document.getElementById('generate').style.display = 'flex';
}


//criar um array com os nomes passados e 
//depois sortea-los aleatoriamente

function sortear() {
    //botão sortear e gerar lista vai sumir para impedir que sorteie mais de uma vez.
    document.getElementById('sortear').style.display = 'none';
    document.getElementById('generate').style.display = 'none';
    
    const array = [];
    let divName = document.querySelectorAll('.namePlayer');

    //saber o layout do sorteio
    let team = qtdTeam.value; //times
    let peoples = qtdPeoples.value; //pessoas por time
    // let players = qtdPlayers.value; //quantidade jogadores

    //vai fazer a interação de cada div criada
    //e vai passar o conteúdo para uma posiçao do array
    for (let a of divName) {
        array.push(a.value);
    }

    //criar aletoriaridade
    //vai definir uma posição no array que será selecionado
    //criar uma seção que será um time
    //dentro dessa seção, terá a quantidade de divs segundo os jogadores
    // vai incluir a div na section e a section na div #sorteados
    //depois vai retirar o valor que foi selecionado na ultima vez
    //e repetir o processo ate zerar.
    const sorteio = () => {
        document.querySelector('.sorteados').style.display = 'flex';
        let newArray = array;
        while (newArray.length > 0) {
            document.getElementById('sorteados').innerHTML = ''
            
            //para saber a quantidade de sections
            for (let i = 0; team > i; i++) {
                let section = document.createElement('section');
                section.className = 'team flex';
                section.setAttribute('id', `section${i}`);

                // criando o input de nome do time
                let inputName = document.createElement("input")
                inputName.setAttribute('type','text');
                inputName.setAttribute('id',`inputNameSection${i}`);
                inputName.setAttribute('placeholder',`Time ${1+i}`); //porque tem que começar com time 1
                
                
                //configurar a quantidade de divs dentro da section
                for (let c = 0; peoples > c; c++) {
                    let positionName = Math.floor(Math.random()*newArray.length);//vai gerar o valor de uma posição
                    let divs = document.createElement('div');
                    divs.className = 'sortPlayer flex';
                    divs.setAttribute('id', `sortP${c}sec${i}`)
                    divs.innerHTML = newArray[positionName];
                    //se caso o usuario nao informar um nome e a posição ficar vazia
                    if(newArray[positionName] == ''){
                        divs.innerHTML = '(Posição vazia)';
                    }
                    section.appendChild(divs);
                    //retirar o valor do array
                    newArray.splice(newArray.indexOf(`${newArray[positionName]}`),1)
                }
                //OK OK gloriaaaaaaaaa a DEUUUSSSSSSS
                
                //inserir a section com as divs na div .sorteados
                document.getElementById('sorteados').appendChild(inputName);
                document.getElementById('sorteados').appendChild(section);
            }
        }
    } 
    sorteio()
}
