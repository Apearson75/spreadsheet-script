import { command } from './command';
import { warn, warnings, error, errors } from '../messages';

module.exports = class CMD extends command {
    override run(): void {
        const message = this.args.join(' ');
        console.log(message);
    }
}