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
    choices: ['MIT License', 'Apache License 2.0', 'GNU General Public License v3.0', 'BSD 2-Clause "Simplified"'],
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

  const readme = `
## License
${license}

# ${title}

## Description
${description}

## Installation
${installation}

## Usage
${usage}

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