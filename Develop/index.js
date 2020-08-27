const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const readFileAsync = util.promisify(fs.readFile);
// function to write README file
const writeFileAsync = util.promisify(fs.writeFile);
const licenseJSONFilePath = "./JSON/licenses.json";
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
        message: 'Describe what your project does.\nText format is the same as markdown.',
        validate: (text) => (
            (text.length < 5) ? "Description must be longer than that!" : true)
    }, {
        //     type: 'editor',
        //     name: 'installation',
        //     message: 'Give instructions on how to install a project.\nText format is the same as markdown.',
        //     validate: (text) => (
        //         (text.length < 10) ? "Description must be longer than that!" : true)
        // }, {
        //     type: 'editor',
        //     name: 'usage',
        //     message: 'Enter your usage information for this project.\nText format is the same as markdown.\nIf none, submit the word \'N/A\'.',
        // }, {
        //     type: 'editor',
        //     name: 'contributions',
        //     message: 'Enter your contribution guidelines for this project.\nText format is the same as markdown.\nIf none, submit the word \'N/A\'.',
        // }, {
        type: 'list',
        name: 'license',
        message: 'What license do you want for your project?',
        choices: licenseChoices,
        // }, {
        //     type: 'input',
        //     name: 'username',
        //     message: 'What is your github username?\n',
        //     validate: (text) => ((text.length < 4) ? "invalid username!" : true)
        // }, {
        //     type: 'input',
        //     name: 'name',
        //     message: 'What is your name?'\
        //     n,
        //     validate: (text) => ((text.length < 2) ? "invalid name!" : true)
        // }, {
        //     type: 'input',
        //     name: 'email',
        //     message: 'What is your email addres?\n',
        //     default: () => 'example@provider.com',
        //     validate: (text) => ((text.length < 4) ? "invalid email!" : true)
    }];
    try {
        const data = await inquirer.prompt(questions);
        console.log(data);
        const content = await generateMarkdown(data);
        console.log(content);
        writeFileAsync('test.md', content);
        console.log('success!');
    } catch (err) {
        console.log(err);
    }
}
// function call to initialize program
init();