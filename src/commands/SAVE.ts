import { command } from './command';
import { warn, warnings, error, errors } from '../messages';
import xlsx from 'xlsx';
import { state } from '../state';

module.exports = class SAVE extends command {
    override run(): void {
        if (state.fileName !== undefined || state.fileName !== '') {
            xlsx.writeFile(state.workbook, state.fileName);
        }    
    }
}