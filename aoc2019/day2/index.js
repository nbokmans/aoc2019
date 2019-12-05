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

const p2 = (values) => {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            let newValues = [...values];
            newValues[1] = noun;
            newValues[2] = verb;

            for (let i = 0; i <= newValues.length; i += 4) {
                const currentOperationInstructions = newValues.slice(i, i + 4);

                const opcode = currentOperationInstructions[0];

                if (opcode == OP_HALT
                    || opcode == null) {
                    break;
                }

                const pos1 = currentOperationInstructions[1];
                const pos2 = currentOperationInstructions[2];
                const targetPos = currentOperationInstructions[3];

                const mutate = (opcode, pos1, pos2, targetPos) =>
                    opcode === Opcode.ADD
                        ? newValues[targetPos] = newValues[pos1] + newValues[pos2]
                        : newValues[targetPos] = newValues[pos1] * newValues[pos2];

                mutate(opcode, pos1, pos2, targetPos);
            }

            if (newValues[0] === 19690720) {
                console.log(`noun:${noun},verb:${verb}`)
                break;
            }
        }
    }



    return [];
}

const p1 = (values) => {
    let newValues = [...values];

    for (let i = 0; i <= newValues.length; i += 4) {
        const currentOperationInstructions = newValues.slice(i, i + 4);

        const opcode = currentOperationInstructions[0];

        if (opcode == OP_HALT
            || opcode == null) {
            break;
        }

        const pos1 = currentOperationInstructions[1];
        const pos2 = currentOperationInstructions[2];
        const targetPos = currentOperationInstructions[3];

        const mutate = (opcode, pos1, pos2, targetPos) =>
            opcode === Opcode.ADD
                ? newValues[targetPos] = newValues[pos1] + newValues[pos2]
                : newValues[targetPos] = newValues[pos1] * newValues[pos2];

        mutate(opcode, pos1, pos2, targetPos);
    }

    return newValues;
}

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
    console.log(p1(values));
    /* Part 2 */
    console.log(p2(values));

});