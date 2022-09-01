// import {NodeVM, VMError} from 'vm2';
import { error, errors } from './messages';
import { state } from './state';

// const vm = new NodeVM({
//     require: {
//         external: true,
//         builtin: ['fs'],
//         root: './'
//     }, 
// });

export class DataParser {
    isError!: boolean;
    stringParser(args: string[], lineNo: number | undefined, fileName: string | undefined) {     
        const input = args.join(' ');
        const content = input.split('+');
        let message: string = "";

        for (let i = 0; i < content.length; i++) {
            var element = content[i];
                if (element.includes('"')) {
                    element = element.replaceAll('"', '');
                    message += element;
                } else {
                    const varName = element.replace(' ', '');
                    let found: boolean = false;
                    if (state.variables.length > 0)
                        for (let j = 0; j <= state.variables.length; j++) {
                            if (varName == state.variables[j].name) {
                                message += state.variables[j].data;
                                found = true;
                                break;
                            }
                        }
                    if (!found) {
                        error(errors.VARIABLE_NOT_FOUND, lineNo, fileName);
                        this.isError = true;
                        return "";
                    }    
                }
        }
        return message;
    }
}    

export function parse(input: string, isVar: boolean, varName: string, lineNo: number | undefined, fileName: string | undefined) {
    if (input === '' || input === undefined || input === '\r')
        return;

    let splitCMD: any = input.replace('\r', '');
    splitCMD = splitCMD.split(" ");
    const command: string = splitCMD[0];
    if (command.startsWith('*')) {
        const cmd = require(`${__dirname}/commands/VARCHANGE`);
        new cmd(splitCMD, isVar, varName).run();
        return;
    }

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
        error(errors.COMMAND_NOT_FOUND, lineNo, fileName);
    }    
}