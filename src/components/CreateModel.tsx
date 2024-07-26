import { useState } from 'react';

const CreateModel = ({ onModelCreated }) => {
  const [model, setModel] = useState('llama3'); // Correct model name
  const [temperature, setTemperature] = useState(1);
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const systemMessage = `
You are ${name}. ${personality}
`;

    try {
      const response = await fetch('/api/createModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, temperature, systemMessage }),
      });

      if (response.ok) {
        onModelCreated(model);
      } else {
        const data = await response.json();
        setError(data.error || 'An unexpected error occurred');
      }
    } catch (err) {
      setError('Failed to create model.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Ollama Model</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model 
          </label>
          <input
            id="model"
            name="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
                    <p>Need help picking a <a target="_blank" class="underline text-red-50" href='https://ollama.com/library'> model?</a> Type in the name and ghola will pull and create a custom model for you!</p>
        </div>
        <div>
          {/* <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
            Temperature
          </label>
          <input
            id="temperature"
            name="temperature"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          /> */}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="personality" className="block text-sm font-medium text-gray-700">
            Personality Traits
          </label>
          <textarea
            id="personality"
            name="personality"
            rows={4}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Model
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="text-lg font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateModel;



