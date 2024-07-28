const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: "What is the title of your project (required)",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Please enter your project title!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "description",
    message: "Please write a full description of your project (required)",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("Please enter your project description!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "installation",
    message: "Please provide installation instructions (required)",
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log("Please provide installation instructions!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "usage",
    message: "Please explain how someone would use this application (required)",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please provide usage information!");
        return false;
      }
    },
  },

  {
    type: "confirm",
    name: "confirmContributors",
    message: "Would you like to allow other developers to contribute?",
    default: true,
  },

  {
    type: "input",
    name: "contribute",
    message: "Please provide guidelines for contributing (Required)",
    when: ({ confirmContributors }) => confirmContributors,
    validate: (contributorInput) => {
      if (contributorInput) {
        return true;
      } else {
        console.log("Please enter contributor guidelines!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "test",
    message: "Please provide test instructions (required)",
    validate: (testInput) => {
      if (testInput) {
        return true;
      } else {
        console.log("Please provide test instructions!");
        return false;
      }
    },
  },

  {
    type: 'list',
    name: 'license',
    message: 'Which license will you use for your Project?',
    choices: ['MIT', 'Apache 2.0 License', 'Boost Software License 1.0', 'BSD 2-Clause License', 'Mozilla Public License 2.0'],
  },

  {
    type: "input",
    name: "git",
    message: "Please provide GitHub username (required)",
    validate: (gitInput) => {
      if (gitInput) {
        return true;
      } else {
        console.log("Please provide GitHub username!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "email",
    message: "Please provide the best email to reach you",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please provide your email!");
        return false;
      }
    },
  },
])

.then((answers) => {
  const {
    title,
    description,
    installation,
    usage,
    confirmContributors,
    contribute,
    test,
    license,
    git,
    email
  } = answers;

  const licenseBadge = generateLicense(license);

  const readme = `

# ${title}

## License

License used for this project: ${licenseBadge}

## Description
${description}

## Installation
${installation}

## Usage
${usage}

## Test
${test}

${confirmContributors ? `## Contributing\n${contribute}\n` : ''}

## Contact
GitHub: [${git}](https://github.com/${git})\n
Email: [${email}](mailto:${email})
`;

  fs.writeFile('README.md', readme, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README.md has been created successfully!');
    }
  });
})

.catch((error) => {
  console.error(error);
});

function generateLicense(license) {
  // MIT License
  if (license === "MIT") {
    return `![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)`;
  } else if (license === "Apache 2.0 License") {
    return `![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)`;
  } else if (license === 'Boost Software License 1.0') {
    return `![License: Boost 1.0](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)`;
  } else if (license === 'BSD 2-Clause License') {
    return `![License: BSD 2-Clause](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)`;
  } else if (license === 'Mozilla Public License 2.0') {
    return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
  }
}