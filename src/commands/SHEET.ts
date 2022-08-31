import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { state } from '../state';

module.exports = class SHEET extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {console.log(state.currentSheet); return;}
        if (state.fileName === undefined && state.fileName === '') { error(errors.NO_FILE_OPEN, this.lineNo, this.fileName); return; }

        if(!state.workbook.SheetNames.includes(this.args[0])) {
            error(errors.SHEET_NOT_FOUND, this.lineNo, this.fileName);
            return;
        }
        if (state.availableSheets.includes(this.args[0])) 
            state.currentSheet = this.args[0];    
    }
}