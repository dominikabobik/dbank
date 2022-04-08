let map = new Map();

let username = "domi";
let password = "1234";
let balance = 0;

let o = {username: username, password: password, balance: balance};

map.set(username, o);

console.log(map.get(username));

let o1 = map.get(username);

o1.balance = 3;

map.set(username, o1);

console.log(map.get(username).balance);