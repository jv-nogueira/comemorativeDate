function criarEventosAnuais() {

    const calendarioId = '235264eed642e915482dde01acb71bb2c207f9c68c5ec150a2bb68b4d28fc38f@group.calendar.google.com';

    const planilha = SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName('Página1');

    const dados = planilha.getDataRange().getValues();

    const calendario = CalendarApp.getCalendarById(calendarioId);

    const timezone = Session.getScriptTimeZone();

    // Cache dos eventos já existentes
    const eventosExistentes = {};

    const hoje = new Date();

    const inicioBusca = new Date(hoje.getFullYear() - 1, 0, 1);
    const fimBusca = new Date(hoje.getFullYear() + 5, 11, 31);

    const eventos = calendario.getEvents(inicioBusca, fimBusca);

    eventos.forEach(evento => {

        const data = Utilities.formatDate(
            evento.getAllDayStartDate(),
            timezone,
            'yyyy-MM-dd'
        );

        const chave = `${evento.getTitle()}_${data}`;

        eventosExistentes[chave] = true;
    });

    for (let i = 1; i < dados.length; i++) {

        try {

            const dataFeriado = dados[i][0];
            const tituloBase = dados[i][1];
            const link = dados[i][2];
            const tipo = dados[i][3];

            // Ignora linhas inválidas
            if (!(dataFeriado instanceof Date) || !tituloBase) {
                continue;
            }

            let titulo = tituloBase;

            if (String(tipo).trim() !== '') {
                titulo += ` - ${tipo}`;
            }

            const descricao = link || '';

            const dataFormatada = Utilities.formatDate(
                dataFeriado,
                timezone,
                'yyyy-MM-dd'
            );

            const chaveEvento = `${titulo}_${dataFormatada}`;

            // Evita duplicados
            if (eventosExistentes[chaveEvento]) {

                Logger.log(`Evento já existe: ${titulo}`);

                continue;
            }

            const evento = calendario.createAllDayEvent(
                titulo,
                dataFeriado,
                {
                    description: descricao
                }
            );

            evento.addPopupReminder(5);

            Logger.log(`Evento criado: ${titulo}`);

        } catch (erro) {

            Logger.log(`Erro na linha ${i + 1}: ${erro}`);

        }
    }
}