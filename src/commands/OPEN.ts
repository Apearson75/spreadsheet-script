import { command } from './command';
import { warn, error, warnings, errors } from '../messages';
import xlsx from 'xlsx';
import { state } from '../state';

module.exports = class CMD extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}
        try {
            state.workbook = xlsx.readFile(this.args[0]);
            state.fileName = this.args[0];
            state.currentSheet = "";
            state.availableSheets = state.workbook.SheetNames;
        } catch(e) {
            error(errors.FILE_NOT_FOUND);
            return;
        }    
    }
}