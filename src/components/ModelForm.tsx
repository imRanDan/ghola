import { useState } from 'react';
import useForm from '../hooks/useForm';

const ModelForm = () => {
  const { values, handleChange, handleSubmit, error } = useForm(
    { model: 'llama3', temperature: 1, name: '', personality: '', userInput: '' },
    async (formValues) => {
      // Your submission logic here
    }
  );

  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e: React.FormEvent, isCreateModel: boolean) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const systemMessage = `
You are ${values.name}. ${values.personality}
`;

    const newMessage = { sender: 'user', text: values.userInput };

    const endpoint = isCreateModel ? '/api/createModel' : '/api/ollama';
    const body = isCreateModel 
      ? JSON.stringify({ model: values.model, temperature: values.temperature, systemMessage }) 
      : JSON.stringify({ model: values.model, temperature: values.temperature, systemMessage, messages: [...messages, newMessage] });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([...messages, newMessage, { sender: isCreateModel ? 'bot' : 'ghola', text: data.output }]);
        values.userInput = '';
      } else {
        setError(data.error || 'An unexpected error occurred');
      }
    } catch (err) {
      setError('Failed to fetch data from the server.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customize and Run Ollama Model</h1>
      <form onSubmit={(e) => handleSubmitForm(e, false)} className="space-y-4">
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model 
          </label>
          <input
            id="model"
            name="model"
            type="text"
            value={values.model}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
            Temperature
          </label>
          <input
            id="temperature"
            name="temperature"
            type="number"
            value={values.temperature}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
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
            value={values.personality}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="userInput"
            name="userInput"
            rows={2}
            value={values.userInput}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <h2 className="text-xl font-bold mt-4">Conversation:</h2>
      <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'text-blue-600' : 'text-green-600'}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="text-lg font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ModelForm;

