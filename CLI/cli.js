// cli.js

// Access command-line arguments (skip the first two, as they are 'node' and 'filename')
const args = process.argv.slice(2);

// Basic command handling
const command = args[0];
switch (command) {
  case "greet":
    const name = args[1];
    console.log(`Hello, ${name || "stranger"}!`);
    break;

  case "sum":
    const num1 = parseFloat(args[1]);
    const num2 = parseFloat(args[2]);
    if (!isNaN(num1) && !isNaN(num2)) {
      console.log(`The sum is: ${num1 + num2}`);
    } else {
      console.log("Please provide two valid numbers.");
    }
    break;

  default:
    console.log("Command not recognized. Try 'greet' or 'sum'.");
}
