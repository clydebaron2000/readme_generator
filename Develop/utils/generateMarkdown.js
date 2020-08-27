// function to generate markdown for README
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const escape = 'N/A';
//contributions and usage are optional
async function generateMarkdown(data) {
    const licenseJSON = JSON.parse(await readFileAsync('./JSON/licenses.json', 'utf8'));
    let intro = `# ${data.title}\n\n## Description\n[![${data.license}](${licenseJSON[data.license].badge})](${licenseJSON[data.license].publicFile})\n${data.description}\n---\n## Table of Contents \n\n* [Installation](#Installation)\n* [Usage](#Usage)\n`;
    if (!data.usage === escape) intro += `* [Credits](#Credits)`;
    if (!data.contributions === escape) intro += `* [License](#License)`;
    intro += `* [Tests](#Tests)\n* [Questions?](#Questions?)\n\n---\n`;
    let sections = `## Installation\n\n${data.installation}\n\n`;
    if (!data.usage === escape) sections += `## Usage\n\n${data.usage}\n\n`;
    sections += `## License\n\nThis project uses [${data.license}](${licenseJSON[data.license].publicFile}).${licenseJSON[data.license].description}\n\n`
    if (!data.contributions === escape) sections += `## Contributing\n\n${data.contribution}\n\n`;
    sections += `## Tests\n\n\n{data.tests}\n\n`;
    sections += `## Questions?\n\nHave questions about my project? [Email me](mailto:${data.email}) at ${data.email}.\n`;
    return intro + sections;
}
module.exports = generateMarkdown;