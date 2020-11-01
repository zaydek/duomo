// https://basarat.gitbook.io/typescript/intro-1/jest#step-2-configure-jest
//
// prettier-ignore
module.exports = {
	roots: [
		"<rootDir>/src",
	],
	testMatch: [
		"**/__tests__/**/*.+(ts|tsx|js)",
		"**/?(*.)+(spec|test).+(ts|tsx|js)",
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
}
