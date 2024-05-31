import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';

export async function POST(request: Request) {
  const { model, temperature, systemMessage } = await request.json();

  console.log('Received request to create model:', model, temperature, systemMessage);

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
    console.log('Modelfile created successfully');
  } catch (err) {
    console.error('Error creating Modelfile:', err);
    return NextResponse.json({ error: 'Error creating Modelfile' }, { status: 500 });
  }

  try {
    // Use Ollama executable from PATH
    console.log('Running command: ollama pull', model);
    const pullOutput = execSync(`ollama pull ${model}`).toString();
    console.log('Model pulled successfully:', pullOutput);

    console.log('Running command: ollama create custom-model -f ./CustomModelfile');
    const createOutput = execSync(`ollama create custom-model -f ./CustomModelfile`).toString();
    console.log('Model created successfully:', createOutput);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error during model operations:', error.message);
    console.error('Stack Trace:', error.stack);

    if (error.message.includes('file does not exist')) {
      console.error('The specified model does not exist or cannot be found.');
    }

    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}



