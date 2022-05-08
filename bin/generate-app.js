#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('\nYou have to provide a name to your app.');
    console.log('\nFor example :');
    console.log('\nnpx express-rapid my-app\n');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/Harshil-Kaneria/custom_express.git";


try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`\nThe file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(error);
  }
  process.exit(1);
}


async function main() {
    try {

      console.log('\nDownloading files...');
      execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

      process.chdir(projectPath);

      // console.log('Installing dependencies...');
      // execSync('npm install');

      // console.log('Removing useless files');
      // execSync('npx rimraf ./.git');
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

      console.log('\nThe installation is done, this is ready to use !');
      console.log(`\nRun This Command To Installing dependencies and Run Server `);
      console.log(`\ncd ${projectName} && npm install && npm run dev`);

    } catch (error) {
      console.log(error);
    }
}
main();