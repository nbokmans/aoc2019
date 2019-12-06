const fs = require('fs');
const readline = require('readline');
const fileStream = fs.createReadStream('input.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const OP_HALT = 99;

const Opcode = {
    ADD: 1,
    MULTIPLY: 2
}

let values = [];

rl.on('line', (line) => {
    values = [
        ...values,
        ...line.split(',').map(Number)
    ];
});

const applyInstruction = (values, instruction) => {
    const opcode = instruction[0];

    if (opcode == OP_HALT
        || opcode == null) {
        return values;
    }

    const pos1 = instruction[1];
    const pos2 = instruction[2];
    const targetPos = instruction[3];

    opcode === Opcode.ADD
        ? values[targetPos] = values[pos1] + values[pos2]
        : values[targetPos] = values[pos1] * values[pos2];

    return values;
}

const applyProgram = (values) => {
    for (let i = 0; i <= values.length; i += 4) {
        const instruction = values.slice(i, i + 4);
        applyInstruction(values, instruction);
    }

    return values;
}

const p2 = (values) => {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            let newValues = [...values];
            newValues[1] = noun;
            newValues[2] = verb;

            const result = applyProgram(newValues);

            if (result[0] === 19690720) {
                return `${noun}${verb}`
            }
        }
    }

    throw 'p2 solution not found';
}

const p1 = (values) => applyProgram([...values]);

rl.on('close', () => {
    /* Part 1 */
    console.log(p1([1, 0, 0, 0, 99]));
    console.log(p1([2, 3, 0, 3, 99]));
    console.log(p1([2, 4, 4, 5, 99, 0]));
    console.log(p1([1, 1, 1, 4, 99, 5, 6, 0, 99]));
    console.log(p1([1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50]))

    values[1] = 12;
    values[2] = 2;
    console.log(p1(values)[0]);
    /* Part 2 */
    console.log(p2(values));

});