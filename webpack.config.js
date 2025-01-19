//import path from 'path';
const path = require('path');

module.exports = {
  entry: './app.js', // Entry file for your application
  target: 'node',          // Specifies the environment (Node.js)
  output: {
    path: path.resolve('.', 'dist'), // Output directory
    filename: 'bundle.js',          // Output filename
  },
  mode: 'production',      // Use 'development' for easier debugging
};
