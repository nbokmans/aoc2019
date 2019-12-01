const fs = require('fs');
const readline = require('readline')

fuelRequired = (mass) => Math.floor(Number(mass) / 3) - 2
fuelRequiredP2 = (mass, accum = 0) => {
    const fuelForMass = fuelRequired(mass);

    if (fuelForMass <= 0) {
        return accum;
    }

    accum += fuelForMass;

    return fuelRequiredP2(fuelForMass, accum);
}

//Tests p1
console.log(fuelRequired(12))
console.log(fuelRequired(14))
console.log(fuelRequired(1969))
console.log(fuelRequired(100756))

//Tests p2
console.log(fuelRequiredP2(12))
console.log(fuelRequiredP2(14))
console.log(fuelRequiredP2(1969))
console.log(fuelRequiredP2(100756))

let sum = 0;
let sumP2 = 0;

const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    sum += fuelRequired(line);
    sumP2 += fuelRequiredP2(line);
});


rl.on('close', () => {
    console.log(`P1: ${sum}`);
    console.log(`P2: ${sumP2}`)
})