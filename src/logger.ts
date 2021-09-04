import winston from "winston";

export type Logger = winston.Logger;
export type LogLevel = "silly" | "debug" | "verbose" | "info" | "warn" | "error";

const format = winston.format;
const loggers = new Map<LogLevel, Logger>();

// TODO: Get logger display level from environment vars. Default to "verbose"
const nodeEnv = process.env["NODE_ENV"] as string;
const defaultLevel: LogLevel = "info";
// nodeEnv === "production" ? "info" : nodeEnv === "test" ? "error" : "debug";

/**
 * Sets up and returns the default runtime logger.
 *
 * @param level The lowest log level which should be printed to the console.
 *
 * @returns The logger, or a new one if no logger has been set up yet.
 */
export function useLogger(
	level: LogLevel = defaultLevel,
	defaultMeta: unknown = undefined
): Logger {
	let logger = loggers.get(level);

	if (!logger) {
		logger = winston.createLogger({
			level,
			format: format.json(),
			defaultMeta
		});

		// eslint-disable-next-line no-constant-condition
		if (true || nodeEnv !== "test") {
			logger.add(
				new winston.transports.Console({
					format: format.cli(),
					level
				})
			);
		}

		loggers.set(level, logger);
	}

	return logger;
}
