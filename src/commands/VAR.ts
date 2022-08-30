import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { parse } from '../parser';
import { state } from '../state';
import { createVar } from '../variable';

module.exports = class VAR extends command {
    override run(): void {
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}

        const varName = this.args[0];
        if (this.args.length == 1) {
            createVar(varName, null);
            return;
        }
        
        this.args.splice(0, 2);
        const cmd = this.args.join(' ');
        parse(cmd, true, varName);
    }
}