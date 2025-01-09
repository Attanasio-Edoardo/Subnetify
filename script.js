const subnetMasks = [
    [128, 0, 0, 0],         // /1
    [192, 0, 0, 0],         // /2
    [224, 0, 0, 0],         // /3
    [240, 0, 0, 0],         // /4
    [248, 0, 0, 0],         // /5
    [252, 0, 0, 0],         // /6
    [254, 0, 0, 0],         // /7
    [255, 0, 0, 0],         // /8
    [255, 128, 0, 0],       // /9
    [255, 192, 0, 0],       // /10
    [255, 224, 0, 0],       // /11
    [255, 240, 0, 0],       // /12
    [255, 248, 0, 0],       // /13
    [255, 252, 0, 0],       // /14
    [255, 254, 0, 0],       // /15
    [255, 255, 0, 0],       // /16
    [255, 255, 128, 0],     // /17
    [255, 255, 192, 0],     // /18
    [255, 255, 224, 0],     // /19
    [255, 255, 240, 0],     // /20
    [255, 255, 248, 0],     // /21
    [255, 255, 252, 0],     // /22
    [255, 255, 254, 0],     // /23
    [255, 255, 255, 0],     // /24
    [255, 255, 255, 128],   // /25
    [255, 255, 255, 192],   // /26
    [255, 255, 255, 224],   // /27
    [255, 255, 255, 240],   // /28
    [255, 255, 255, 248],   // /29
    [255, 255, 255, 252],   // /30
    [255, 255, 255, 254],   // /31
    [255, 255, 255, 255]    // /32
];

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

function getIp(){
    return document.getElementById('ip').value;
}

function createTable(){
    return document.createElement('table');
}

function getContainer(){
    return document.getElementById('container');
}

function dividedOctets(value){
    return value.split('.');
}
function necessaryNetmask(){
    let defaultNetmask = defNetmask();

    return defaultNetmask + numOfSubnet();
}

function defNetmask(){
    let firstOctect = parseInt(dividedOctets(getIp())[0]);

    return firstOctect >= 0 && firstOctect <= 127 ? 8 : firstOctect >= 128 && firstOctect <= 191 ? 16 : firstOctect >= 192 && firstOctect <= 223 ? 24 : console.log("l'indirizzo non è valido");
}

function numOfSubnet(){
    let requestedSubnet = Number(document.getElementById('subnets').value);

    let bitForSub = Math.log2(requestedSubnet);

    return Number.isInteger(bitForSub) ? bitForSub + 1 : Math.ceil(bitForSub);
}

function calculateBroadIp(numOfBit){
    let netIpOfActualSubnet = calculateNetIp(numOfBit);

    console.log(netIpOfActualSubnet,'---1');
    let broadIp = netIpOfActualSubnet.split('');

    const startBit = necessaryNetmask();
    for(let i =  startBit; i < 32; i++){
        broadIp[i] = '1';
    }

    return broadIp.join('');
}

//funzione che resitituisce l'ip di rete
function calculateNetIp(numOfBit) {
    const Ip = getIp(); 
    const partsIp = dividedOctets(Ip); 
    const partsMask = subnetMasks[necessaryNetmask() - 1]; 
    const numSubnetBits = numOfSubnet(); 

    // Converte IP e maschera in binario
    const ipBin = partsIp.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
    const maskBin = partsMask.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');

    // Calcola i bit della subnet
    const subnetBits = numOfBit.toString(2).padStart(numSubnetBits, '0');

    // Genera l'indirizzo di rete in binario
    const networkBin = ipBin.substr(0, defNetmask()) + subnetBits + '0'.repeat(32 - defNetmask() - numSubnetBits); 

    return networkBin;
    
}
// Converte l'indirizzo di rete in formato decimale
function rebuildIp(ip){
    const networkParts = [];
    for (let i = 0; i < 4; i++) {
        networkParts.push(parseInt(ip.substr(i * 8, 8), 2));
    }

    return networkParts.join('.'); 
}

function createSubnetTable(){
    const table = createTable();
    const numSubnet =  2 ** numOfSubnet();
    table.appendChild(createTableHeader());

    for (let i = 0; i < numSubnet; i++) {
    const tr = createTr();

        for (let j = 0; j < 4; j++) {
            const td = createTd();
            td.textContent = j == 0 ? `${i}` : j == 1 ? rebuildIp(calculateNetIp(i)) : j == 2 ? rebuildIp(calculateBroadIp(i)) : j == 3 ? calculateDefGate(i) : rangeIp(i);
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