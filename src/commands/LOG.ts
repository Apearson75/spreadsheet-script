import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { state } from '../state';

module.exports = class LOG extends command {
    override run(): void {
        const input = this.args.join(' ');
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
                    for (let j = 0; j <= state.variables.length; j++) {
                        if (varName == state.variables[j].name) {
                            message += state.variables[j].data;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        error(errors.VARIABLE_NOT_FOUND, this.lineNo, this.fileName);
                        return;
                    }    
                }
        }

        console.log(message);
    }
}