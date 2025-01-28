# Subnetify
Subnetify  ( "subnet"  +  "simplify" ) è un progetto che permette di calcolare facilmente e velocemente le informazioni necessarie per gestire subnet in una rete.

Example:
  - subnet: 20
  - host: 80
  - IP: 127.127.127.127

n° subnet | indirizzo di rete|    netmask    | indirizzo di broadcast| default gateway | range indirizzi
----------|------------------|---------------|-----------------------|-----------------|----------------
0         |127.0.0.0         |255.248.0.0    |127.7.255.255          |127.7.255.254    |127.0.0.1-127.7.255.254
1         |127.8.0.0         |255.248.0.0    |127.15.255.255         |127.15.255.254   |127.8.0.1-127.15.255.254
n         |...               |...            |...                    |...              |...






