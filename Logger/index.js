/**
 * Logger Configurartion
 * It is the logging framework for javaScript.
 */

/**
 * The certain levels of logger based on the prority of the logging states.
 * { DEBUG < INFO < WARN < ERROR < FATAL }
 */
const log4js = require("log4js");

/**
 * Requiring the env variables.
 */
require("dotenv").config();

/**
 * Log4js Configuration
 */

log4js.configure({
  appenders: {
    /**
     * Logstash Appender
     */
    logstash: {
      type: "@log4js-node/logstash-http",
      url: process.env.ELASTIC_LOGSTASH_URL,
      application: "actyv_bootcamp_log",
      logType: "application"
    },

    /**
     * Console Appender
     */
    console: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%d{yyyy-MM-dd hh:mm:ss.SSS} %p %c %m"
      }
    },

    /**
     * File Appender
     */
    file: {
      type: "file",
      filename: `actyv-bootcamp-logs.log`,
      maxLogSize: 10485760,
      compress: true
    }
  },
  categories: {
    default: { appenders: ["file", "logstash"], level: "info" },
    error: { appenders: ["file", "logstash"], level: "error" },
    debug: { appenders: ["file", "logstash"], level: "debug" },
    warn: { appenders: ["file", "logstash"], level: "warn" },
    console: { appenders: ["console"], level: "info" }
  }
});

//uncaught exceptions

/**
 * Default logger
 */

const logger = log4js.getLogger();

/**
 * Console Logger
 */

const consoleLogger = log4js.getLogger("console");

module.exports = { logger, consoleLogger };

/**
 * The general syntax of the loggly is
 * logger.info({ tags: ['my-tag-1', 'my-tag-2'] }, 'Some message');
 */

/**
 * The general syntax of  File appender
 * logger.debug("");
 */

/**
 * The TCP appender sends log events to a master server over TCP sockets.
 * It can be used as a simple way to centralise logging when you have multiple servers or processes.
 */
