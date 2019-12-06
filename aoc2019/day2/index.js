const { readFile } = require('../util/filereader');

const Opcode = {
    ADD: 1,
    MULTIPLY: 2,
    HALT: 99
}

const applyProgram = (values) => {
    for (let i = 0; i <= values.length; i += 4) {
        const [opcode, pos1, pos2, targetPos] = values.slice(i, i + 4);

        switch (opcode) {
            case Opcode.ADD:
                values[targetPos] = values[pos1] + values[pos2]
                break;
            case Opcode.MULTIPLY:
                values[targetPos] = values[pos1] * values[pos2]
                break;
            case Opcode.HALT:
            default:
                break;
        }
    }

    return values;
}

const p1 = (values) => applyProgram([...values]);

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

readFile('input.txt', (str) => {
    const values = str.split(',').map(Number);
    console.log(values);
    console.log(p1(values)[0]);
    console.log(p2(values));
});