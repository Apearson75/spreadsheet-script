import { error, errors, warn, warnings } from "../messages";

export class command {
    args!: string[];
    isVar!: boolean;
    varName!: string;
    lineNo!: number | undefined;
    fileName!: string | undefined;

    constructor(args: string[], isVar: boolean, varName: string, lineNo: number | undefined, fileName: string | undefined) {
        this.args = args;
        this.isVar = isVar;
        this.varName = varName;
        this.lineNo = lineNo;
        this.fileName = fileName;
    }

    run() {
        console.log(this.args);
    }
}