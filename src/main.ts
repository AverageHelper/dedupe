import "source-map-support/register.js";
import fs from "fs";
import ora from "ora";
import { useLogger } from "./logger.js";

const logger = useLogger();
const cwd = process.cwd();

function filename(path: string): string {
	const segments = path.split("/");
	return segments[segments.length - 1] ?? path;
}

function run(): void {
	const paths = fs.readdirSync(cwd);
	if (paths.length === 0) {
		logger.info(`No files in directory '${cwd}'`);
		return;
	}
	if (paths.length === 1) {
		logger.info(`There are no duplicate files in directory '${cwd}'`);
		return;
	}

	const duplicatePaths: Record<string, Set<string>> = {};
	const spinner = ora(`Checking ${paths.length} files in directory '${cwd}'`).start();

	paths.forEach((pathA, idxA) => {
		const filenameA = filename(pathA);
		logger.debug(`Comparing ${filename(pathA)} to ${paths.length - idxA - 1} other files...`);

		// Compare fileA with every file following.
		for (let idxB = idxA + 1; idxB < paths.length; idxB++) {
			const pathB = paths[idxB] as string;
			const filenameB = filename(pathB);
			logger.debug(`\tComparing ${filenameA} to ${filenameB}...`);

			try {
				const fileAStats = fs.statSync(pathA);
				const fileBStats = fs.statSync(pathB);

				// Check the sizes match
				if (fileAStats.size === fileBStats.size) {
					logger.debug(`${filenameA} and ${filenameB} are both ${fileAStats.size} bytes`);

					// Check the contents of the file.
					const fileA = fs.readFileSync(pathA);
					const fileB = fs.readFileSync(pathB);

					if (fileA.equals(fileB)) {
						spinner.info(`${filenameA} and ${filenameB} are duplicates`);

						// We have a duplicate!
						const duplicates = duplicatePaths[pathA] ?? new Set();
						duplicates.add(pathB);
						duplicatePaths[pathA] = duplicates;
					}
				}
			} catch (error: unknown) {
				if (error instanceof Error && error.message.includes("EISDIR")) {
					logger.debug(`${filenameB} is a directory.`);
				}
			}
		}
	});

	const total = Object.keys(duplicatePaths).length;
	spinner.succeed(`Found duplicates for ${total} file${total === 1 ? "" : "s"}`);
}

void run();
