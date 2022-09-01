import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import xlsx from 'xlsx';
import { state } from '../state';
import { DataParser } from '../parser';

module.exports = class SET extends command {
    override run(): void {
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED, this.lineNo, this.fileName); return;}
        if (state.fileName === undefined && state.fileName === '') { error(errors.NO_FILE_OPEN, this.lineNo, this.fileName); return; }
        if (state.currentSheet === undefined || state.currentSheet == '') {error(errors.SHEET_REQUIRED, this.lineNo, this.fileName); return;}

        var worksheet = state.workbook.Sheets[state.currentSheet];
        const cellParser = new DataParser();

        var cell: any = new Array();
        cell.push(this.args[0])
        cell = cellParser.stringParser(cell, this.lineNo, this.fileName);
        if (cellParser.isError) return;
        this.args.splice(0, 1);

        const dataParser = new DataParser(); 
        var data = dataParser.stringParser(this.args, this.lineNo, this.fileName);

        try {
            var change = xlsx.utils.sheet_add_aoa(worksheet, [
                [data]
            ], { origin: cell });
            state.workbook.Sheets[state.currentSheet] = change;
        } catch {
            error(errors.INVALID_ARGUMENTS, this.lineNo, this.fileName);
            return;
        }    
    }
}