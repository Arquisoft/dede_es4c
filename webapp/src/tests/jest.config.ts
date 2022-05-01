export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["<rootDir>/tests/*.tsx"],
    collectCoverage: true,
    collectCoverageFrom:["**/*.tsx"]
}