import { command } from './command';
import { warn, error, warnings, errors } from '../messages';
import xlsx from 'xlsx';
import { state } from '../state';
import { DataParser } from '../parser';

module.exports = class CMD extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED, this.lineNo, this.fileName); return;}
        
        const dataParser = new DataParser();
        const file = dataParser.stringParser(this.args, this.lineNo, this.fileName);
        if (dataParser.isError)
            return;
        try {
            // @ts-ignore
            state.workbook = xlsx.readFile(file);
            state.fileName = file;
            state.currentSheet = "";
            state.availableSheets = state.workbook.SheetNames;
        } catch(e) {
            error(errors.FILE_NOT_FOUND, this.lineNo, this.fileName);
            return;
        }    
    }
}