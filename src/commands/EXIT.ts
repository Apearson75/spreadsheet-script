import { command } from "./command";

module.exports = class EXIT extends command{
    override run(): void {
        process.exit();
    }
}