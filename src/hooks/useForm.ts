import { useState } from 'react';

const useForm = (initialValues: any, onSubmit: (values: any) => void) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await onSubmit(values);
  };

  return { values, handleChange, handleSubmit, error };
};

export default useForm; 