import {useState} from 'react';
import {Form} from '@heroui/form';
import {Input} from '@heroui/input';

const IngredientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    pricePerUnit: null as number | null,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Form
        className="w-[400px]"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          name="name"
          placeholder="Введите название ингредиента"
          type="text"
          value={formData.name}
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm focus:outline-none'
          }}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          validate={(value) => {
            if (!value) return 'Название обязательно';
            return null;
          }}
        />
      </Form>
    </>
  );
};

export default IngredientForm;