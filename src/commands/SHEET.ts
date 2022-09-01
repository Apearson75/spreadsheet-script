import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import { state } from '../state';
import { DataParser } from '../parser';

module.exports = class SHEET extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {console.log(state.currentSheet); return;}
        if (state.fileName === undefined && state.fileName === '') { error(errors.NO_FILE_OPEN, this.lineNo, this.fileName); return; }

        const dataParser = new DataParser();
        const sheet = dataParser.stringParser(this.args, this.lineNo, this.fileName);

        if(!state.workbook.SheetNames.includes(sheet)) {
            error(errors.SHEET_NOT_FOUND, this.lineNo, this.fileName);
            return;
        }
        if (state.availableSheets.includes(sheet)) 
            state.currentSheet = sheet;    
    }
}