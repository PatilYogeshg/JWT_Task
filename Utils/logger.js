const { createLogger, format, transports, addColors } = require('winston');
const { combine, colorize, label, timestamp, json, prettyPrint, printf } = format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
let myCustomFormat = format.combine(
  colorize({
      all: true
  }),
  label({
      label: '[LOGGER]'
  }),
  timestamp({
      format: 'YY-MM-DD HH:MM:SS'
  }),
  
  printf((info) => ` ${info.label} ${info.timestamp}  ${info.level} : ${info.message}`));
  
  addColors({
  info: 'yellow', // fontStyle color
  warn: 'italic orange',
  error: 'bold red',
  debug: 'green'

});
  const logger = createLogger({
    // level: 'info',
    // levels:logLevels,
    transports: [ new transports.Console({format: combine(myCustomFormat)})]
    });

module.exports=logger