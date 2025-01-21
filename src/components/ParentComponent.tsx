import React, { useState } from 'react';
import CreateModel from './CreateModel';
import Conversation from './Conversation';

const ParentComponent = () => {
  const [modelName, setModelName] = useState('');

  const handleModelCreated = (name: string) => {
    setModelName(name); // Store the name from CreateModel
  };

  return (
    <div>
      <CreateModel onModelCreated={handleModelCreated} />
      <Conversation model={modelName} />
    </div>
  );
};

export default ParentComponent; 