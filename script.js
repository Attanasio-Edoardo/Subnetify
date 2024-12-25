// Funzione per ottenere il numero di subnet dall'input
function getNumSubnet(){
    return document.getElementById('subnets').value;
}

// Funzione per ottenere il numero di host dall'input
function getNumHosts() {
    return document.getElementById('hosts').value;
}

// Funzione per ottenere l'indirizzo IP dall'input
function getIp(){
    return document.getElementById('ip').value;
}

// Funzione per creare un elemento tr
function createTr(){
    return document.createElement('tr');
}

// Funzione per creare un elemento td
function createTd(){
    return document.createElement('td');
}

// Funzione per creare un elemento th
function createTh() {
    return document.createElement('th');
}

// Funzione per creare una tabella
function createTable(){
    return document.createElement('table');
}

function riconosciClasseIp(){
    let ip = getIp();
    let firstDott = parseInt(ip.split('.')[0],10);

    return firstDott >= 0 && firstDott <= 127 ? 0b11111111_00000000_00000000_00000000 : firstDott >= 128 && firstDott <= 191 ? 0b11111111_11111111_00000000_00000000 : firstDott >= 192 && firstDott <= 223 ? 0b11111111_11111111_11111111_00000000 : console.log("l'indirizzo non è valido");
}

function calculateNetIp() {
    const ip = getIp();
    
}

// Funzione per creare l'intestazione della tabella
function createTableHeader() {
    const tr = createTr();

    const headers = [
        'N° SUBNET', 
        'INDIRIZZO DI RETE', 
        'INDIRIZZO DI BROADCAST', 
        'Default Gateway', 
        'RANGE INDIRIZZI'
    ];

    headers.forEach(headerText => {
        const th = createTh();
        th.textContent = headerText;
        tr.appendChild(th);
    });

    return tr;
}

// Funzione per creare la tabella con numero di righe dinamico
function createSubnetTable(){
    const numSubnet = getNumSubnet();
    const table = createTable();

    // Aggiungi classe o stile per la tabella
    table.classList.add('styled-table');

    // Crea l'intestazione
    table.appendChild(createTableHeader());

    // Crea le righe dinamicamente
    for (let i = 0; i < numSubnet; i++) {
        const tr = createTr();

        for (let j = 0; j < 5; j++) {
            const td = createTd();
            td.textContent = j == 0 ? `${i + 1}` : j == 1 ? calculateNetIp() : j == 2 ? calculateBroadIp() : j == 3 ? calculateDefGate() : rangeIp();// Contenuto di esempio
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}

// Funzione per creare la sezione delle informazioni sulla subnet
function createSubnetInfo(){
    const container = document.getElementById('container');

    // Rimuovi eventuali tabelle precedenti
    const existingTable = container.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    const table = createSubnetTable();
    container.appendChild(table);
}

// Funzione principale per avviare il processo di subnetting
function startSubnetting(){
    console.log(riconosciClasseIp());
    createSubnetInfo();
}
