import chalk from 'chalk';


export enum warnings {
    TOO_MANY_ARGUMENTS = "You have used more arguments than required",
}
export enum errors {
    COMMAND_NOT_FOUND = "Command could not be found",
    ARGUMENTS_REQUIRED = "Arguments are required",
    FILE_NOT_READABLE = "File could not be read"
}


export function warn(message: warnings) {
    console.log(chalk.yellow(`Warning: ${message}`));
}

export function error(message: errors) {
    console.log(chalk.red(`Error: ${message}`));
}