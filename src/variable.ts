import { state } from "./state";

export interface variable {
    name: string;
    data: any;
}

export function createVar(name: string, data: any) {
    state.variables.push({
        name: name,
        data: data
    });
    console.log(state.variables);
}