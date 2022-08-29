import {NodeVM, VMError} from 'vm2';
import { error, errors } from './messages';

const vm = new NodeVM({
    require: {
        external: true,
        builtin: ['fs'],
        root: './'
    }, 
});

export function parse(input: string) {
    const splitCMD = input.split(" ");
    const command = splitCMD[0];
    splitCMD.splice(0, 1);

    console.log({
        command: command,
        arguments: splitCMD
    });
    try {
        vm.run(`const command = require('./out/commands/${command}'); new command(${JSON.stringify(splitCMD)}).run();`);
    } catch(e: any) {
        error(errors.COMMAND_NOT_FOUND);
    }    
}