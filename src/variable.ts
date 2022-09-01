import { state } from "./state";

export interface variable {
    name: string;
    data: any;
}

export function createVar(name: string, data: any) {
    if (state.variables.length > 0)
        for (const i in state.variables) {
            if (state.variables[i].name === name) {
                state.variables[i].data = data;
                return;
            }
        }
    state.variables.push({
        name: name,
        data: data
    });
}