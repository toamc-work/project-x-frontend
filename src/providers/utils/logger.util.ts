/* eslint-disable no-console */
const styles = {
  DBG: "background-color: #2E3A59; color: #A5B3D5; font-size: 14px; padding: 5px;",
  WARN: "background-color: #FFC107; color: #4A4A4A; font-size: 14px; font-weight: bold; padding: 5px;",
  ERR: "background-color: #D32F2F; color: #FFFFFF; font-size: 14px; font-weight: bold; padding: 5px",
};

export class Logger {
  constructor(private readonly name: string) {}

  debug(message: string) {
    if (import.meta.env.DEV) {
      console.log(`%cDEBUG: [ ${this.name} ] ${message}`, styles.DBG);
    }
  }

  error(message: string) {
    if (import.meta.env.DEV) {
      console.error(`%cERROR: [ ${this.name} ] ${message}`, styles.ERR);
    } else {
      console.error(`ERROR: [ ${this.name} ] ${message}`);
    }
  }

  warn(message: string) {
    if (import.meta.env.DEV) {
      console.log(`%cWARN: [ ${this.name} ] ${message}`, styles.WARN);
    }
  }
}
