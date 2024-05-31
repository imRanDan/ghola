"use client";

import { useState } from 'react';
import CreateModel from '@/components/CreateModel';
import Conversation from '@/components/Conversation';

export default function Home() {
  const [modelCreated, setModelCreated] = useState(false);
  const [model, setModel] = useState('');

  const handleModelCreated = (modelName: string) => {
    setModel(modelName);
    setModelCreated(true);
  };

  return (
    <div>
      {!modelCreated ? (
        <CreateModel onModelCreated={handleModelCreated} />
      ) : (
        <Conversation model={model} />
      )}
    </div>
  );
}

