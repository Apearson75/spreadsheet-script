import { error, errors, warn, warnings } from "../messages";

export class command {
    args!: string[];
    isVar!: boolean;
    varName!: string;

    constructor(args: string[], isVar: boolean, varName: string) {
        this.args = args;
        this.isVar = isVar;
        this.varName = varName;
    }

    run() {
        console.log(this.args);
    }
}