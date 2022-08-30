import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { state } from '../state';

module.exports = class FREE extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}

        let found: boolean = false;
        for (let j = 0; j <= state.variables.length; j++) {
            if (this.args[0] == state.variables[j].name) {
                state.variables.splice(j, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            error(errors.VARIABLE_NOT_FOUND);
            return;
        } 
    }
}