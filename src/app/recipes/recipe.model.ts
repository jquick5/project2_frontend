import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public recipeId: number;
  public name: string;
  public category: string;
  public numOfLikes: number;
  public prepMethod: string;
  public description: string;
  public imagePath: string;
  public ingredients: string[];
  public userId: number;

  constructor(
    recipeId: number,
    name: string,
    category: string,
    numOfLikes: number,
    prepMethod: string,
    description: string,
    imagePath: string,
    ingredients: string[],
    userId: number
  ) {
    this.recipeId = recipeId;
    this.name = name;
    this.category = category;
    this.numOfLikes = numOfLikes;
    this.prepMethod = prepMethod;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.userId = userId;
  }
}
