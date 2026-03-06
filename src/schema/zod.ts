import {object, string, z} from 'zod';

export const signInSchema = object({
  email: string()
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: string()
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const ingredientSchema = object({
  name: string().min(1, 'Name is required'),

  category: z.enum([
    'VEGETABLES',
    'FRUITS',
    'MEAT',
    'DAIRY',
    'SPICES',
    'OTHER',
  ]),

  unit: z.enum([
    'GRAMS',
    'KILOGRAMS',
    'LITERS',
    'MILLILITERS',
    'PIECES',
  ]),

  pricePerUnit: z
    .number()
    .min(0, 'Price must be greater than or equal to 0')
    .nullable(),

  description: z.string().optional(),
});