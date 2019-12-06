const { readFile } = require('../util/filereader');

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

readFile('input.txt', str => {
    const masses = str.split('\n').slice(1);
    const p1 = masses.reduce((total, mass) => total += fuelRequired(mass), 0);
    const p2 = masses.reduce((total, mass) => total += fuelRequiredP2(mass), 0);

    console.log(p1);
    console.log(p2);
});