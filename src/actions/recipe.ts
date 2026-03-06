'use server';

import prisma from '@/utils/prisma';

export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredient: {
          include: {
            ingredient: true
          }
        }
      }
    });

    return {success: true, recipes};
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {success: false, error: 'Ошибка при загрузке рецептов'};
  }
}

export async function createRecipe(formData: FormData) {
  try {
    const name = String(formData.get('name') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const imageUrlValue = String(formData.get('imageUrl') || '').trim();
    const imageUrl = imageUrlValue || null;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient_'))
      .map(([key, value]) => {
        const index = key.split('_')[1];
        const ingredientId = String(value || '').trim();
        const quantityRaw = String(formData.get(`quantity_${index}`) || '').trim();
        const quantity = parseFloat(quantityRaw);

        return {ingredientId, quantity};
      });

    const hasInvalidIngredients = ingredients.some(
      ({ingredientId, quantity}) =>
        !ingredientId || Number.isNaN(quantity) || quantity <= 0
    );

    if (!name || ingredients.length === 0 || hasInvalidIngredients) {
      return {
        success: false,
        error: 'Имя, хотя бы один ингредиент и корректное количество обязательны'
      };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredient: {
          create: ingredients.map(({ingredientId, quantity}) => ({
            ingredient: {connect: {id: ingredientId}},
            quantity
          }))
        }
      },
      include: {
        ingredient: {
          include: {
            ingredient: true
          }
        }
      }
    });

    return {success: true, recipe};
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    console.error('message:', error?.message);
    console.error('code:', error?.code);
    console.error('meta:', error?.meta);

    return {
      success: false,
      error: error?.message || 'Ошибка при создании рецепта'
    };
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string | null;
    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient_'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split('_')[1]}`) as string
        )
      }));

    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: 'Имя и хотя бы один ингредиент обязательны'
      };
    }

    const recipe = await prisma.recipe.update({
      where: {id},
      data: {
        name,
        description,
        imageUrl,
        ingredient: {
          deleteMany: {},
          create: ingredients.map(({ingredientId, quantity}) => ({
            ingredient: {connect: {id: ingredientId}},
            quantity
          }))
        }
      },
      include: {
        ingredient: {
          include: {
            ingredient: true
          }
        }
      }
    });

    return {success: true, recipe};
  } catch (error) {
    console.error('Error updating recipe:', error);
    return {success: false, error: 'Ошибка при обновлении рецепта'};
  }
}

export async function deleteRecipe(id: string) {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: {recipeId: id}
    });

    await prisma.recipe.delete({
      where: {id}
    });

    return {success: true};
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return {success: false, error: 'Ошибка при удалении рецепта'};
  }
}