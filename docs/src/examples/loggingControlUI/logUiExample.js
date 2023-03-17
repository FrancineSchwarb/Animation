import { Appender as ObservableAppender }         from "../../kolibri/logger/appender/observableAppender.js";
import { Appender as ConsoleAppender } from "../../kolibri/logger/appender/consoleAppender.js";
import { LoggerFactory }               from "../../kolibri/logger/loggerFactory.js";
import { createLogUi }                 from "../../kolibri/logger/logUi/createLogUi.js";
import { addToAppenderList, setMessageFormatter } from "../../kolibri/logger/logger.js";

const consoleAppender     = ConsoleAppender();
const observableAppender  = ObservableAppender();

const formatLogMsg = context => logLevel => logMessage => {
  const date = new Date().toISOString();
  return `[${logLevel}]\t${date} ${context}: ${logMessage}`;
};

setMessageFormatter(formatLogMsg);
addToAppenderList(observableAppender, consoleAppender);

const logger1 = LoggerFactory("ch.fhnw");
const logger2 = LoggerFactory("ch.fhnw.ip5");

const container = document.getElementById("container");

createLogUi(container, "../../../css/kolibri-logging-control.css");

setInterval(() => {
  const loggers = [
      logger1.trace, logger1.debug, logger1.info, logger1.warn, logger1.error, logger1.fatal,
      logger2.trace, logger2.info, logger2. debug, logger2.warn, logger2.error, logger2.fatal
  ];
  const msg = ["hello world", "Tobias Wyss", "Andri Wild", "IP5", "wild animals",  "into the wild", "# drive 🏍 "];
  loggers[Math.floor(Math.random() * loggers.length)](msg[Math.floor(Math.random()* msg.length)]);

}, 2000);