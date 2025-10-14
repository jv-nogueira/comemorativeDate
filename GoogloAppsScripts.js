function criarEventosAnuais() {
    // Obtenha o ID do calendário
    var calendarioId = '235264eed642e915482dde01acb71bb2c207f9c68c5ec150a2bb68b4d28fc38f@group.calendar.google.com';
  
    // Obtenha a página da planilha "All"
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('All');
    var dados = planilha.getDataRange().getValues();
  
    // Laço de repetição sobre as linhas da planilha
    for (var i = 1; i < dados.length; i++) {
        var titulo = dados[i][1]; // Coluna B
        var link = dados[i][2]; // Coluna C
        var descricao = link !== "" ? link : ""; // Se a célula da coluna C não estiver vazia, use o link
        var valorColunaD = dados[i][3]; // Coluna D
        if (valorColunaD !== " ") {
            titulo += " - " + valorColunaD;
        }
        
        var dataFeriado = dados[i][0]; // Coluna A
  
        // Verifica se a célula tem uma data e se está em 2024
        if (dataFeriado instanceof Date && dataFeriado.getFullYear() === 2024) {
            // Crie o evento no Google Agenda para o ano de 2024
            var evento = CalendarApp.getCalendarById(calendarioId).createAllDayEvent(titulo, dataFeriado, {description: descricao});
  
            // Configuração da notificação pop-up 5 minutos antes do evento
            var minutosAntes = 5; // Aparentemente esse é o mínimo, é melhor pesquisar antes de modificar
            evento.addPopupReminder(minutosAntes);
  
            Logger.log('Evento criado: ' + evento.getTitle());
        }
    }
}
