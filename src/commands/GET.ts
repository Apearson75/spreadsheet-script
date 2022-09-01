import xlsx from 'xlsx';
import { warn, warnings, error, errors } from '../messages';
import { command } from './command';
import { state } from '../state';
import { createVar } from '../variable';
import { DataParser } from '../parser';

module.exports = class GET extends command {
    override run(): void {
        if (this.args.length >= 2) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED, this.lineNo, this.fileName); return;}
        if (state.fileName === undefined || state.fileName === '') { error(errors.NO_FILE_OPEN, this.lineNo, this.fileName); return; }

        if (this.args[0].toUpperCase() === "SHEETS") { 
            if (this.isVar) {
                createVar(this.varName, state.workbook.SheetNames);
                return;
            }
            return
        }

        if (state.currentSheet === undefined || state.currentSheet == '') {error(errors.SHEET_REQUIRED, this.lineNo, this.fileName); return;}

        if (this.args[0] === "FILE") { 
            console.log(xlsx.utils.sheet_to_csv(state.workbook.Sheets[state.currentSheet])) 
        }
        
        // Else
        const dataParser = new DataParser();
        const coordinates = dataParser.stringParser(this.args, this.lineNo, this.fileName);
        if (dataParser.isError)
            return;
            
        var worksheet = state.workbook.Sheets[state.currentSheet];
        try {
            var cell = worksheet[coordinates].v;
        } catch {
            error(errors.CELL_NOT_FOUND, this.lineNo, this.fileName);
            return;
        }
        if (this.isVar) {
            createVar(this.varName, cell);
            return;
        }    
        console.log(cell);
    }    
}