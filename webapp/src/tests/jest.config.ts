export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["tsx"],
    collectCoverageFrom: ["src/components/components/*.tsx"],
}