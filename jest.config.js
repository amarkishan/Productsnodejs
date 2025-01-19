module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel for JavaScript files
  },
  testEnvironment: "node", // Use Node.js environment for testing
  moduleFileExtensions: ["js", "json", "node"], // Recognize file extensions
};