import path from "path";
import winston, { format } from "winston";
import {
  ConsoleTransportOptions,
  FileTransportOptions,
} from "winston/lib/winston/transports";

const console: ConsoleTransportOptions = {
  level: "info",
  consoleWarnLevels: ["error", "log", "warn"],
};

const file: FileTransportOptions = {
  level: "error",
  filename: path.join(__dirname, "../../../logs/error.log"),
};

const transports = [
  new winston.transports.Console(console),
  new winston.transports.File(file),
];

const logger = winston.createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "DD.MM.YY HH:MM:SS",
    }),
    format.json(),
    format.colorize({ all: true })
    // format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports,
});

export default logger;
