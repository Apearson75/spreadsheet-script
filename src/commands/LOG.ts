import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { state } from '../state';
import { DataParser } from '../parser';

module.exports = class LOG extends command {
    override run(): void {
        
        const dataParser = new DataParser();
        const message = dataParser.stringParser(this.args, this.lineNo, this.fileName);
        if (dataParser.isError)
            return;
        console.log(message);
    }
}