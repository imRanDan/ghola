# Ghola - Model Customization and Conversation App

Ghola is a web application built with Next.js, TypeScript, and Tailwind CSS that enables users to create and interact with customized language models (using Ollama) with specific personalities and traits. The app's name references the summonable assistants in the Dune series by Frank Herbert.

## Features

- **Custom Language Models**: Define personalities and traits for unique language models.
- **Conversational Interface**: Interact seamlessly with custom models in a chat-style format.
- **Modular Components**: Separate components handle model creation and conversation management.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ghola.git
   cd ghola
2. **Install dependencies:**
   ```bash
   npm install
3. **Install and configure Ollama:**
  Ensure Ollama is installed on your system and accessible via the command line. Refer to the Ollama documentation     for installation and setup instructions.
   
4. **Run the development server:**
   ```bash
   npm run dev

5. **Open the app in your browser:**
   Navigate to http://localhost:3000 to see the application in action.

Usage
Creating a Custom Model

    Fill out the form on the home page:
        Model: Specify the base model to use (e.g., llama3).
        Temperature: Set the creativity level of the model (higher values yield more creativity, while lower values make it more coherent).
        Name: Provide a name for the custom model.
        Personality Traits: Describe the desired personality traits and behaviors.

    Submit the form:
    The model will be created and pulled using the specified settings.

Starting a Conversation

    Enter a message:
    Type your message in the conversation input box.

    Send the message:
    The custom model will respond based on the defined personality and traits.

License

This project is licensed under the MIT License. See the LICENSE file for details.
