import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import xlsx from 'xlsx';
import { state } from '../state';

module.exports = class SET extends command {
    override run(): void {
        if (this.args.length >= 3) warn(warnings.TOO_MANY_ARGUMENTS);
        if (this.args.length == 0) {error(errors.ARGUMENTS_REQUIRED); return;}
        if (state.fileName === undefined && state.fileName === '') { error(errors.NO_FILE_OPEN); return; }
        if (state.currentSheet === undefined || state.currentSheet == '') {error(errors.SHEET_REQUIRED); return;}

        var worksheet = state.workbook.Sheets[state.currentSheet];
        var cell = this.args[0];
        this.args.splice(0, 1);
        var data = this.args.join(' ');
        data = data.replace('"', '');
        try {
            var change = xlsx.utils.sheet_add_aoa(worksheet, [
                [data]
            ], { origin: cell });
            state.workbook.Sheets[state.currentSheet] = change;
        } catch {
            error(errors.INVALID_ARGUMENTS);
            return;
        }    
    }
}