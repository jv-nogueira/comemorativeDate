// Função para converter o índice para o mês correspondente
function obterMes(index) {
    // Mapeia os índices de 0 e 1 para 1 (Janeiro), 2 e 3 para 2 (Fevereiro), etc.
    return Math.floor(index / 2) + 1;
}

// Função para formatar o número do mês com dois dígitos
function formatarNumeroMes(mesNumerico) {
    return mesNumerico < 10 ? '0' + mesNumerico : mesNumerico;
}

// String para armazenar o resultado de todos os meses
var resultadoTotal = "";

// Loop pelos índices de indexMes
for (var indexMes = 0; indexMes < document.querySelectorAll("[class='list-holidays']").length; indexMes++) {
    // Seleciona o mês
    var mes = document.querySelectorAll("[class='list-holidays']")[indexMes];
    
    // String para armazenar o resultado deste mês
    var resultadoMes = "";
    
    // Obtém o mês a partir do índice
    var mesNumerico = obterMes(indexMes);
    var mesFormatado = formatarNumeroMes(mesNumerico);

    // Laço de repetição para iterar sobre os dias
    for (var indexDia = 0; indexDia < mes.children.length; indexDia++) {
        // Seleciona o dia, título, link e feriado
        var dia = mes.children[indexDia].children[0].children[0].innerHTML;
        var titulo = mes.children[indexDia].children[1].children[0].innerHTML;
        var link = mes.children[indexDia].children[1].children[0].href;

        // Verifica se o elemento de feriado existe
        var feriadoElement = mes.children[indexDia].children[1].children[1];
        var feriado = feriadoElement ? feriadoElement.innerHTML : 'undefined';

        // Adiciona as informações ao resultado deste mês
        resultadoMes += `${dia}/${mesFormatado}/2024\t${titulo}\t${link}\t${feriado}\n`;
    }

    // Adiciona o resultado deste mês ao resultado total
    resultadoTotal += resultadoMes;
}

// Função para baixar o arquivo .txt
function downloadTxtFile(content, filename) {
    var blob = new Blob([content], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Chama a função para baixar o arquivo com os resultados de todos os meses
downloadTxtFile(resultadoTotal, 'feriados_total.txt');
