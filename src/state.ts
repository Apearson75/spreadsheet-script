import xlsx from 'xlsx'
import { variable } from './variable';

export class state {
    static fileName: string;
    static workbook: xlsx.WorkBook;
    static currentSheet: string;
    static availableSheets: Array<string>;

    static variables: variable[] = [];
}