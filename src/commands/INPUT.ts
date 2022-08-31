import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import readline from 'readline-sync';
import { state } from '../state';
import { createVar } from '../variable';

module.exports = class INPUT extends command {
    override run(): void {
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED, this.lineNo, this.fileName); return;}

        const question = this.args.join(' ');

        if (this.isVar) {
            var input = readline.question(`${question}\n`);
            createVar(this.varName, input);
        }
    }
}