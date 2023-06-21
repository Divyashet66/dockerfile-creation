const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");

// Create an instance of Express
const app = express();

// Load environment variables from .env file
dotenv.config();

// Read Dockerfile template
const templateNodejs = fs.readFileSync(
  "templates/nodejs/template.txt",
  "utf-8"
);
const templateSpringboot = fs.readFileSync(
  "templates/springboot/template.txt",
  "utf-8"
);
const templatePhp = fs.readFileSync("templates/php/template.txt", "utf-8");

// Function to replace all occurrences of variables in a template string
const replaceAll = (template, variables) => {
  return template.replace(/\${(\w+)}/g, (match, variable) => {
    return variables[variable] || "";
  });
};

// Endpoint to generate and return the Dockerfile
app.get("/api/node", (req, res) => {
  try {
    // Replace placeholders in the template with values from .env
    const dockerfileContent = replaceAll(templateNodejs, process.env);

    // Write the generated Dockerfile to the current directory
    fs.writeFileSync("Dockerfile", dockerfileContent);
    console.log("Dockerfile created successfully");
    res.send("Dockerfile created successfully");
  } catch (error) {
    console.error("Error creating Dockerfile:", error);
    res.send("Error creating Dockerfile");
  }
});

app.get("/api/springboot", (req, res) => {
  try {
    // Replace placeholders in the template with values from .env
    const dockerfileContent = replaceAll(templateSpringboot, process.env);

    // Write the generated Dockerfile to the current directory
    fs.writeFileSync("Dockerfile", dockerfileContent);
    console.log("Dockerfile created successfully");
    res.send("Dockerfile created successfully");
  } catch (error) {
    console.error("Error creating Dockerfile:", error);
    res.send("Error creating Dockerfile");
  }
});

app.get("/api/php", (req, res) => {
  try {
    // Replace placeholders in the template with values from .env
    const dockerfileContent = replaceAll(templatePhp, process.env);

    // Write the generated Dockerfile to the current directory
    fs.writeFileSync("Dockerfile", dockerfileContent);
    console.log("Dockerfile created successfully");
    res.send("Dockerfile created successfully");
  } catch (error) {
    console.error("Error creating Dockerfile:", error);
    res.send("Error creating Dockerfile");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
