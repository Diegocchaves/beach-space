console.log('%cLoggy v1.0', 'font-size: 36px; background: linear-gradient(to right, #30CFD0 0%, #330867 100%); color: white;')

class Logger {
    static DEBUG = 0
    static INFO = 1
    static WARN = 2
    static ERROR = 3
    static FATAL = 4

    #name
    static #level = Logger.DEBUG

    constructor(name) {
        this.#name = name
    }

    static setLevel(level) {
        if (level < Logger.DEBUG || level > Logger.FATAL)
            throw new Error(`invalid level ${level}`)

        Logger.#level = level
    }

    debug(message) {
        if (Logger.#level === Logger.DEBUG)
            console.log(`%cDEBUG %c${new Date().toISOString()} %c${this.#name} %c${message}`, 'color: green; font-weight: bold;', 'color: gray;', 'color: black; font-weight: bold;', 'color: black;')
    }

    info(message) {
        if (Logger.#level <= Logger.INFO)
            console.log(`%cINFO %c${new Date().toISOString()} %c${this.#name} %c${message}`, 'color: blue; font-weight: bold;', 'color: gray;', 'color: black; font-weight: bold;', 'color: black;')
    }

    warn(message) {
        if (Logger.#level <= Logger.WARN)
            console.log(`%cWARN %c${new Date().toISOString()} %c${this.#name} %c${message}`, 'color: gold; font-weight: bold;', 'color: gray;', 'color: black; font-weight: bold;', 'color: black;')
    }

    error(message) {
        if (Logger.#level <= Logger.ERROR)
            console.log(`%cERROR %c${new Date().toISOString()} %c${this.#name} %c${message}`, 'color: tomato; font-weight: bold;', 'color: gray;', 'color: black; font-weight: bold;', 'color: black;')
    }

    fatal(message) {
        if (Logger.#level <= Logger.FATAL)
            console.log(`%cFATAL%c ${new Date().toISOString()} %c${message}`, 'color: white; background-color: tomato; font-weight: bold;', 'color: gray;', 'color: black; font-weight: bold;', 'color: black;')
    }
}
export default Logger