const { exec } = require('child_process');

const args = process.argv.slice(2);
const resourceName = args[0];

if (!resourceName) {
  console.error('Please provide a resource name.');
  process.exit(1);
}

const command = `nest g resource ${resourceName}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
