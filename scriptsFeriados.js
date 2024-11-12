// Index do mês
var indexMes = 0;

// Seleciona o mês
var mes = document.querySelectorAll("[class='list-holidays']")[indexMes];

// String para armazenar o resultado
var resultado = "";

// Laço de repetição para iterar sobre os dias
for (var indexDia = 0; indexDia < mes.children.length; indexDia++) {
    // Seleciona o dia, título, link e feriado
    var dia = mes.children[indexDia].children[0].children[0].innerHTML;
    var titulo = mes.children[indexDia].children[1].children[0].innerHTML;
    var link = mes.children[indexDia].children[1].children[0].href;

    // Verifica se o elemento de feriado existe
    var feriadoElement = mes.children[indexDia].children[1].children[1];
    var feriado = feriadoElement ? feriadoElement.innerHTML : 'undefined';

    // Adiciona as informações ao resultado
    resultado += `${dia}/01/2024\t${titulo}\t${link}\t${feriado}\n`;
}

// Função para criar um blob e baixar o arquivo .txt
function downloadTxtFile(content, filename) {
    var blob = new Blob([content], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Chama a função para baixar o arquivo
downloadTxtFile(resultado, 'feriados.txt');
