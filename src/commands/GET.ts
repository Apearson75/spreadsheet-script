import { warn, warnings, error, errors } from '../messages';
import { command } from './command';

module.exports = class GET extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}
        console.log(`Got ${this.args[0]}`);
    }    
}