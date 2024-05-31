# Ghola - Model Customization and Conversation App

This project is a web application built using Next.js, TypeScript, and Tailwind CSS. The application allows users to create and interact with customized language models (using Ollama) with specific personalities and traits. Ghola is in reference to the summonable assistants of old (or in this case, whomever you want) from the Dune series by Frank Herbert.


## Features

- Create custom language models with specified personalities and traits.
- Interact with the created models in a conversational manner.
- Separate components for model creation and conversation handling.

## Installation(#installation)

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ghola.git
   cd ghola

Install dependencies:

```bash
npm install
```
Install and configure Ollama:

Ensure Ollama is installed on your system and accessible via the command line. Follow the instructions from the Ollama documentation for installation and setup.

Run the development server:

```bash
Copy code
npm run dev
```
Open the app in your browser:
Navigate to http://localhost:3000 to see the application in action.

## Usage
Creating a Custom Model
Fill out the form on the home page:

Model: Specify the base model to use (e.g., llama3).
Temperature: Set the creativity level of the model (higher is more creative, lower is more coherent).
Name: Provide a name for the custom model.
Personality Traits: Describe the personality traits and behaviours of the model.
Submit the form:
The model will be created and pulled using the specified settings.

Starting a Conversation
Enter a message:
Type your message in the conversation input box.

Send the message:
The custom model will respond based on the provided personality and traits.

License
This project is licensed under the MIT License. See the LICENSE file for details.
