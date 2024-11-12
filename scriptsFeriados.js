// index mes
var indexMes = 0

// index dia
var indexDia = 0

// A cada dois index é um mês
var mes = document.querySelectorAll("[class='list-holidays']")[indexMes]

// dia
mes.children[indexDia].children[0].children[0].innerHTML

// title
mes.children[indexDia].children[1].children[0].innerHTML

// link
mes.children[indexDia].children[1].children[0].href

// feriado ou ponto facultativo
mes.children[indexDia].children[1].children[1].innerHTML




// Index do mês
var indexMes = 0;

// Seleciona o mês
var mes = document.querySelectorAll("[class='list-holidays']")[indexMes];

// Laço de repetição para iterar sobre os dias
for (var indexDia = 0; indexDia < mes.children.length; indexDia++) {
    // Seleciona o dia, título, link e feriado
    var dia = mes.children[indexDia].children[0].children[0].innerHTML;
    var titulo = mes.children[indexDia].children[1].children[0].innerHTML;
    var link = mes.children[indexDia].children[1].children[0].href;

    // Verifica se o elemento de feriado existe
    var feriadoElement = mes.children[indexDia].children[1].children[1];
    var feriado = feriadoElement ? feriadoElement.innerHTML : 'undefined';

    // Exibe no console as informações no formato desejado
    console.log(`${dia}/01/2024 - ${titulo} - ${link} - ${feriado}`);
}

