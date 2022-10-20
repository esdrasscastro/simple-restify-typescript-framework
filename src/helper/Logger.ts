/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

enum TerminalColors {
    RESET = '\u001b[0m',
    RED = '\u001b[31m',
    BLACK = '\u001b[30m',
    GREEN = '\u001b[32m',
    YELLOW = '\u001b[33m',
    BLUE = '\u001b[34m',
    MAGENTA = '\u001b[35m',
    CYAN = '\u001b[36m',
    WHITE = '\u001b[37m',
    BRIGHT_BLACK = '\u001b[30;1m',
    BRIGHT_RED = '\u001b[31;1m',
    BRIGHT_GREEN = '\u001b[32;1m',
    BRIGHT_YELLOW = '\u001b[33;1m',
    BRIGHT_BLUE = '\u001b[34;1m',
    BRIGHT_MAGENTA = '\u001b[35;1m',
    BRIGHT_CYAN = '\u001b[36;1m',
    BRIGHT_WHITE = '\u001b[37;1m',
  }

class Log {
  info (message?: any, ...optionalParams: any[]) {
    console.info(`[  ${TerminalColors.BRIGHT_CYAN}INFO${TerminalColors.RESET} ] `.concat(message), ...optionalParams)
  }

  error (message?: any, ...optionalParams: any[]) {
    console.error(`[ ${TerminalColors.BRIGHT_RED}ERROR${TerminalColors.RESET} ] `.concat(message), ...optionalParams)
  }

  warn (message?: any, ...optionalParams: any[]) {
    console.warn(`[  ${TerminalColors.BRIGHT_YELLOW}WARN${TerminalColors.RESET} ] `.concat(message), ...optionalParams)
  }

  debug (message?: any, ...optionalParams: any[]) {
    console.warn(`[ ${TerminalColors.BRIGHT_MAGENTA}DEBUG${TerminalColors.RESET} ] `.concat(message), ...optionalParams)
  }
}

const Logger = new Log()

export {
  TerminalColors,
  Logger
}
