export interface IIngredients {
  id: string;
  name: string;
  category: string;
  unit: string;
  pricePerUnit: number | null;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}