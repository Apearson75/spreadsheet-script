import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { parse } from '../parser';
import { state } from '../state';

module.exports = class VARCHANGE extends command {
    override run(): void {
        const varName = this.args[0].replace('*', '');
        this.args.splice(0, 2);
        const cmd = this.args.join(' ');
        parse(cmd, true, varName, undefined, undefined);
    }
}