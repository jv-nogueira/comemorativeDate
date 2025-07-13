document.getElementById("executar").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    window.close();

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extrairDados
  });
});

function extrairDados() {
    // Função para converter o índice para o mês correspondente
    function obterMes(index) {
        // Mapeia os índices de 0 e 1 para 1 (Janeiro), 2 e 3 para 2 (Fevereiro), etc.
        return Math.floor(index) + 1;
    }

    // Função para formatar o número do mês com dois dígitos
    function formatarDoisNumber(mesNumerico) {
        return mesNumerico < 10 ? '0' + mesNumerico : mesNumerico;
    }

    // String para armazenar o resultado de todos os meses
    var resultadoTotal = "";

    // Loop pelos índices de indexMes
    for (var indexMes = 0; indexMes < document.querySelectorAll("[class='calendar-list-holiday-box-list']").length; indexMes++) {
        // Seleciona o mês
        var mes = document.querySelectorAll("[class='calendar-list-holiday-box-list']")[indexMes];
        
        // String para armazenar o resultado deste mês
        var resultadoMes = "";
        
        // Obtém o mês a partir do índice
        var mesNumerico = obterMes(indexMes);
        var mesFormatado = formatarDoisNumber(mesNumerico);

        // Laço de repetição para iterar sobre os dias
        for (var indexDia = 0; indexDia < mes.children.length; indexDia++) {
            // Seleciona o dia, título, link e feriado
            var diaBruto = mes.children[indexDia].children[0].children[0].innerText.split(" ")[0];
            var dia = formatarDoisNumber(parseInt(diaBruto));
            var titulo = mes.children[indexDia].children[1].children[0].innerHTML;
            var link = mes.children[indexDia].children[1].children[0].href || "";

            // Adiciona as informações ao resultado deste mês
            resultadoMes += `${dia}/${mesFormatado}/2025\t${titulo}\t${link}\n`;
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

}
