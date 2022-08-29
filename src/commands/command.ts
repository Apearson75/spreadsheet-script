import { error, errors, warn, warnings } from "../messages";

export class command {
    args!: any[];

    constructor(args: any[]) {
        this.args = args;
    }

    run() {
        console.log(this.args);
    }
}