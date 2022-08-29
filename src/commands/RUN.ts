import fs from 'fs';
import { error, errors, warn, warnings } from '../messages';
import { command } from './command';
import { parse } from '../parser';


let script: Array<string>;

module.exports = class RUN extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}

        try {
            script = fs.readFileSync(this.args[0]).toString().split('\n');
        } catch(e) {
            error(errors.FILE_NOT_READABLE);    
        }
        for (let i = 0; i < script.length; i++) {
            parse(script[i]);
        }
    }
}