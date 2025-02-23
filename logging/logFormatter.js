import util from 'node:util';

export const formatErrorLog = (info) => {
  const metaString =
    info.meta && Object.keys(info.meta).length > 0
      ? `\n ${util.inspect(info.meta, { depth: null })}`
      : '';

  let logMessage = `[${info.timestamp}]: [${info.level}] ${info.message}`;

  if (info.stack) {
    logMessage += `\nStack: ${info.stack}`;
  }

  if (info.cause) {
    logMessage += `\nCause: ${info.cause}`;
  }

  if (metaString) {
    logMessage += `${metaString}`;
  }

  return logMessage;
};

export const formatRegularLog = (info) => {
  return `[${info.timestamp}]: [${info.level}] ${info.message}`;
};
