import chalk from 'chalk';


export enum warnings {
    TOO_MANY_ARGUMENTS = "You have used more arguments than required",
}
export enum errors {
    COMMAND_NOT_FOUND = "Command could not be found",
    ARGUMENTS_REQUIRED = "Arguments are required",
    FILE_NOT_FOUND = "File could not be found",
    NO_FILE_OPEN = "There is no file open",
    SHEET_NOT_FOUND = "Sheet was not found",
    SHEET_REQUIRED = "Sheet is required",
    INVALID_ARGUMENTS = "An invalid argument has been entered",
    VARIABLE_NOT_FOUND = "Variable could not be found",
}


export function warn(message: warnings) {
    console.log(chalk.yellow(`Warning: ${message}`));
}

export function error(message: errors | string, lineNo: number | undefined, fileName: string | undefined) {
    if (lineNo !== undefined && fileName !== undefined)
        console.log(chalk.bold.red(`${fileName}:${lineNo + 1}`), chalk.red(`- ${message}`));
    else
        console.log(chalk.red(`Error: ${message}`));
}