import { useState } from 'react';

const Conversation = ({ model }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const newMessage = { sender: 'user', text: userInput };

    try {
      const response = await fetch('/api/converse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages: [...messages, newMessage] }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([...messages, newMessage, { sender: 'bot', text: data.output }]);
        setUserInput('');
      } else {
        setError(data.error || 'An unexpected error occurred');
      }
    } catch (err) {
      setError('Failed to fetch data from the server.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Conversation with {model}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="userInput"
            name="userInput"
            rows={2}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send
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

export default Conversation;




