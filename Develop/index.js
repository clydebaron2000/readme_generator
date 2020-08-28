const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const readFileAsync = util.promisify(fs.readFile);
// function to write README file
const writeFileAsync = util.promisify(fs.writeFile);
const licenseJSONFilePath = "./JSON/licenses.json";
const editorSubmit = 'Text will be formated the same as markdown.\nSave and exit the editor to submit your response.';
// function to initialize program
async function init() {
    const licenseChoices = Object.keys(JSON.parse(await readFileAsync(licenseJSONFilePath, 'utf8')));
    // array of questions for user
    const questions = [{
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?\n',
        default: () => 'Title',
    }, {
        type: 'editor',
        name: 'description',
        message: 'Describe what your project does.\n',
        default: () => `Describe what your project does.\n${editorSubmit}`,
        validate: (text) => (
            (text.length < 3) ? "Description must be longer than that!" : true)
    }, {
        type: 'editor',
        name: 'installation',
        message: 'Give instructions on how to install the project.\n',
        default: () => `Give instructions on how to install the project.\n${editorSubmit}`,
        validate: (text) => (
            (text.length < 3) ? "Intallation instructions must be longer than that!" : true)
    }, {
        type: 'editor',
        name: 'usage',
        message: 'Enter your usage information for this project.\n',
        default: () => `Enter your usage information for this project.\n${editorSubmit}\nIf none, submit 'N/A'.`
    }, {
        type: 'editor',
        name: 'contributions',
        message: 'Enter your contribution guidelines for this project.\n',
        default: () => `Enter your contribution guidelines for this project.\n${editorSubmit}\nIf none, submit 'N/A'.`
    }, {
        type: 'editor',
        name: 'tests',
        message: 'Enter tests people can run for this project.\n',
        default: () => `Enter tests people can run for this project.\n${editorSubmit}\nIf none, submit 'N/A'.`
    }, {
        type: 'list',
        name: 'license',
        message: 'What license do you want for your project?',
        choices: licenseChoices,
        default: () => licenseChoices.findIndex((index) => index === 'MIT')
    }, {
        type: 'input',
        name: 'username',
        message: 'What is your github username?\n',
        default: () => 'clydebaron2000',
        validate: (text) => ((text.length < 4) ? "Invalid username! Try Again" : true)
    }, {
        type: 'input',
        name: 'name',
        message: 'What is your name?\n',
        default: () => 'Clyde Baron Rapinan',
        validate: (text) => ((text.length < 2) ? "Invalid name! Try Again" : true)
    }, {
        type: 'input',
        name: 'email',
        message: 'What is your email address?\n',
        default: () => 'example@provider.com',
        validate: (text) => ((text.length < 4) ? "Invalid email! Try Again" : true)
    }, {
        type: 'input',
        name: 'fileName',
        message: 'What file name do you want to save your markdown file to? (exclude \'.md\')\n',
        default: () => 'test',
        validate: (text) => ((text.length < 2) ? "Invalid file name! Try Again" : true)
    }, ];
    try {
        console.log(`Let's create your README.md!\n----------------------------\n`)
        const data = await inquirer.prompt(questions);
        // console.log(data);
        const content = await generateMarkdown(data);
        // console.log(content);
        writeFileAsync(`${data.fileName}.md`, content);
        console.log(`\n\n\n---Success! Your information was written to ${data.fileName}.md!---`);
    } catch (err) {
        console.log(err);
    }
}
// function call to initialize program
init();