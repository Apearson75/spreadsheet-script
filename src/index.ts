import readline from 'readline-sync';
import { parse } from './parser';

while (true) {
    const command = readline.question("> ");
    if (command != '' && command != undefined)
        parse(command, false, '', undefined, undefined);
}    