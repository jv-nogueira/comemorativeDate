document.getElementById("executar").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    window.close();

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extrairDados
    });
});

function extrairDados() {

    function obterMes(index) {
        return Math.floor(index) + 1;
    }

    function formatarDoisNumber(valor) {
        return valor < 10 ? '0' + valor : valor;
    }

    function obterAnoDaUrl() {
        const match = window.location.href.match(/datas-comemorativas-(\d{4})/);
        return match ? match[1] : new Date().getFullYear();
    }

    const ano = obterAnoDaUrl();

    var resultadoTotal = "";

    const meses = document.querySelectorAll("[class='calendar-list-holiday-box-list']");

    for (var indexMes = 0; indexMes < meses.length; indexMes++) {

        var mes = meses[indexMes];
        var resultadoMes = "";

        var mesNumerico = obterMes(indexMes);
        var mesFormatado = formatarDoisNumber(mesNumerico);

        for (var indexDia = 0; indexDia < mes.children.length; indexDia++) {

            var diaElement = mes.children[indexDia].children[0].children[0];

            var diaBruto = diaElement.innerText.split(" ")[0];
            var dia = formatarDoisNumber(parseInt(diaBruto));

            var tituloEl = mes.children[indexDia].children[1].children[0];

            var titulo = tituloEl.innerHTML;
            var link = tituloEl.href || "";

            // Verifica cor do pseudo-elemento ::after
            var colorAfter = getComputedStyle(diaElement, '::after').backgroundColor;

            var tipoDia = "";

            if (colorAfter === 'rgb(193, 235, 172)') {
                tipoDia = "Feriado";
            }
            else if (colorAfter === 'rgb(255, 226, 153)') {
                tipoDia = "Ponto Facultativo";
            }

            resultadoMes += `${dia}/${mesFormatado}/${ano}\t${titulo}\t${link}\t${tipoDia}\n`;
        }

        resultadoTotal += resultadoMes;
    }

    function downloadTxtFile(content, filename) {

        var blob = new Blob([content], { type: 'text/plain' });

        var link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.download = `feriados_${ano}.txt`;

        link.click();
    }

    downloadTxtFile(resultadoTotal);
}