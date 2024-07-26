import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(request: Request) {
  const { model, messages } = await request.json();

  try {
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
      console.error(`loading ${data}`);
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


