
function createTr(){
    return document.createElement('tr');
}

function createTd(){
    return document.createElement('td');
}

function createTh() {
    return document.createElement('th');
}

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

function createTable(){
    return document.createElement('table');
}

function getContainer(){
    return document.getElementById('container');
}

function calculateNetIp(){

}

function createSubnetTable(numSubnet){
    const table = createTable();

    table.appendChild(tableHeader());

    for (let i = 0; i < numSubnet; i++) {
    const tr = createTr();

        for (let j = 0; j < 5; j++) {
            const td = createTd();
            td.textContent = j == 0 ? `${i + 1}` : j == 1 ? calculateNetIp() : j == 2 ? calculateBroadIp() : j == 3 ? calculateDefGate() : rangeIp();
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}


function createSubnetInfo(){
    const container = getContainer();

    const existingTable = container.querySelector('table');
    if (existingTable){
        existingTable.remove();
    }

    const table = createSubnetTable();
}