// import {NodeVM, VMError} from 'vm2';
import { error, errors } from './messages';

// const vm = new NodeVM({
//     require: {
//         external: true,
//         builtin: ['fs'],
//         root: './'
//     }, 
// });

export function parse(input: string, isVar: boolean, varName: string) {
    let splitCMD: any = input.replace('\r', '');
    splitCMD = splitCMD.split(" ");
    const command = splitCMD[0];
    splitCMD.splice(0, 1);

    // console.log({
    //     command: command,
    //     arguments: splitCMD
    // });
    try {
        const cmd = require(`${__dirname}/commands/${command}`);
        new cmd(splitCMD, isVar, varName).run();
        // vm.run(`const command = require('./out/commands/${command}'); new command(${JSON.stringify(splitCMD)}).run();`);
    } catch(e: any) {
        console.log(e);
        error(errors.COMMAND_NOT_FOUND);
    }    
}