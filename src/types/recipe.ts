import {IIngredients} from '@/types/ingredients';

export interface IRecipeIngredient {
  id: string;
  ingredientId: string;
  quantity: number;
  ingredient: IIngredients;
}

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  ingredients: IRecipeIngredient[];
}