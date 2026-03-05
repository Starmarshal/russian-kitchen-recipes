'use server';

import {ingredientSchema} from '@/schema/zod';
import prisma from '@/utils/prisma';
import {z} from 'zod';

export async function createIngredient(formData: FormData) {
  try {
    console.log('formData', formData);

    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      unit: formData.get('unit') as string,
      pricePerUnit: formData.get('pricePerUnit')
        ? parseFloat(formData.get('pricePerUnit') as string)
        : null,
      description: formData.get('description') as string,
    };

    const validData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validData.name,
        category: validData.category,
        unit: validData.unit,
        pricePerUnit: validData.pricePerUnit,
        description: validData.description,
      }
    });

    return {success: true, ingredient};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {error: error.errors.map(e => e.message).join(', ')};
    }
    console.error('Ошибка создания ингредиента:', error);
    return {e: 'Ошибка при создании ингредиента'};
  }
}