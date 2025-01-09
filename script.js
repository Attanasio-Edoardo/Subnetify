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

function rangeIp(numOfBit){
    return rebuildIp(calculateFirstHostIp(numOfBit)) + "-" + rebuildIp(calculateDefGate(numOfBit));
}

function calculateFirstHostIp(numOfBit){
    let broadIp = calculateNetIp(numOfBit).split('');
    broadIp[31] = '1';

    return broadIp.join('');
}

function calculateDefGate(numOfBit){
    let broadIp = calculateBroadIp(numOfBit).split('');
    broadIp[31] = '0';

    return broadIp.join('');

}

function calculateBroadIp(numOfBit){
    let netIpOfActualSubnet = calculateNetIp(numOfBit);

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

    const ipBin = partsIp.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
    const maskBin = partsMask.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');

    // Calcola i bit della subnet
    const subnetBits = numOfBit.toString(2).padStart(numSubnetBits, '0');

    const networkBin = ipBin.substr(0, defNetmask()) + subnetBits + '0'.repeat(32 - defNetmask() - numSubnetBits); 

    return networkBin;
    
}

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

        for (let j = 0; j <= 4; j++) {
            const td = createTd();
            td.textContent = j == 0 ? `${i}` : j == 1 ? rebuildIp(calculateNetIp(i)) : j == 2 ? rebuildIp(calculateBroadIp(i)) : j == 3 ? rebuildIp(calculateDefGate(i)) : j == 4 ? rangeIp(i): console.log("niente oh!!!");
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}

function checkIp(){
    ip = getIp();
    const formatIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;

    if (!formatIp.test(ip)) {
        return false;
    }

    const octets = ip.split('.');

    for(let i = 0; i < octets.length; i++){
        if(octets[i] < 0 || octets[i] > 255){
            return false;
        }
    }

    return true;    
}

function checkSubnet(){
    
    let host = Number(document.getElementById('hosts').value);
    let netmaskBits = necessaryNetmask();

    let bitHost = Math.log2(host);

    let bitHosts =  Number.isInteger(bitHost) ? bitHost + 1 : Math.ceil(bitHost);
    return bitHosts < netmaskBits;
}

function createSubnetInfo(){
    
    let ipCheck = checkIp()
    let subnetCheck = checkSubnet()

    if(ipCheck){

        if(subnetCheck){
            const container = getContainer();

            const existingTable = container.querySelector('table');
            if (existingTable){
                existingTable.remove();
            }

            const table = createSubnetTable();
            container.after(table);
        }else{
            alert('Configurazione subnet non valida')
        }
    }else{
        alert('Indirizzo IP non valido');
    }
}