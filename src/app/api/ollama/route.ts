// src/app/api/ollama/route.ts
import { NextResponse } from 'next/server';
import { exec, execSync } from 'child_process';
import fs from 'fs';

export async function POST(request: Request) {
  const { model, temperature, systemMessage, messages } = await request.json();

  // Create Modelfile content
  const modelfileContent = `
FROM ${model}

# set the temperature to ${temperature} [higher is more creative, lower is more coherent]
PARAMETER temperature ${temperature}

# set the system message
SYSTEM """
${systemMessage}
"""
`;

  // Write the Modelfile
  try {
    fs.writeFileSync('CustomModelfile', modelfileContent);
  } catch (err) {
    console.error('Error creating Modelfile:', err);
    return NextResponse.json({ error: 'Error creating Modelfile' }, { status: 500 });
  }

  console.log('Modelfile created successfully');

  try {
    // Pull the model
    const pullOutput = execSync(`ollama pull ${model}`).toString();
    console.log('Model pulled successfully:', pullOutput);

    // Create the model
    const createOutput = execSync(`ollama create custom-model -f ./CustomModelfile`).toString();
    console.log('Model created successfully:', createOutput);

    // Run the model and interact with it
    const childProcess = exec(`ollama run custom-model`);

    messages.forEach((message) => {
      childProcess.stdin.write(`${message.sender}: ${message.text}\n`);
    });
    childProcess.stdin.end();

    let runOutput = '';
    childProcess.stdout.on('data', (data) => {
      runOutput += data;
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    return new Promise((resolve) => {
      childProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`child process exited with code ${code}`);
          resolve(NextResponse.json({ error: `Process exited with code ${code}` }, { status: 500 }));
        } else if (!runOutput.trim()) {
          console.error('Error: Model output is empty.');
          resolve(NextResponse.json({ error: 'Model output is empty' }, { status: 500 }));
        } else {
          console.log('Model run successfully. Output:', runOutput);
          resolve(NextResponse.json({ output: runOutput }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Error during model operations:', error.message);
    console.error('Stack Trace:', error.stack);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}



