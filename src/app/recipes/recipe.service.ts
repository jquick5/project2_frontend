import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[];
  //  = [
  //   new Recipe(
  //     'Meatloaf',
  //     'Dinner',
  //     5,
  //     'Cook Meatloaf',
  //     'Yummy meatloaf',
  //     'https://www.spendwithpennies.com/wp-content/uploads/2019/05/New-The-BEST-Meatloaf-7.jpg',
  //     [
  //       new Ingredient('Ground Beef', 2, 'lbs'),
  //       new Ingredient('Eggs', 2, 'ea'),
  //       new Ingredient('Bread Crumbs', 1, 'cup'),
  //     ],
  //     8
  //   ),
  //   new Recipe(
  //     'Pizza',
  //     'Dinner',
  //     10,
  //     'Cook Pizza',
  //     'Yummy Pizza',
  //     'https://cdn2.lamag.com/wp-content/uploads/sites/6/2018/07/ny-style-pizza-los-angeles-getty-images-1068x709.jpg',
  //     [
  //       new Ingredient('Pizza Dough', 28, 'oz'),
  //       new Ingredient('Pizza Sauce', 16, 'oz'),
  //       new Ingredient('Mozzarella Cheese', 2, 'cups'),
  //     ],
  //     8
  //   ),
  //   new Recipe(
  //     'Burgers',
  //     'Lunch',
  //     22,
  //     'Cook Burgers',
  //     'Yummy Burgers',
  //     'https://cdn2.lamag.com/wp-content/uploads/sites/6/2015/10/HinokiCover.jpg',
  //     [
  //       new Ingredient('Ground Beef', 2, 'lbs'),
  //       new Ingredient('Bacon', 16, 'oz'),
  //       new Ingredient('Buns', 1, 'package'),
  //     ],
  //     8
  //   ),
  // ];

  constructor(
    private slService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipes() {
    //return this.recipes.slice();

    return this.http.get<Recipe[]>('http://localhost:5500/api/recipes');
  }

  getRecipe(index: number) {
    //return this.recipes[index];
    return this.http.get<Recipe>(`http://localhost:5500/api/recipes/${index}`);
  }

  addToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    //this.recipes.push(recipe);
    //this.recipesChanged.next(this.recipes.slice());
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<Recipe>(
      'http://localhost:5500/api/recipes',
      JSON.stringify(recipe),
      options
    );
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // this.recipes[index] = newRecipe;
    //this.recipesChanged.next(this.recipes.slice());
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.put<Recipe>(
      `http://localhost:5500/api/recipes/${index}`,
      JSON.stringify(newRecipe),
      options
    );
  }

  deleteRecipe(index: number) {
    // this.recipes.splice(index, 1);
    //this.recipesChanged.next(this.recipes.slice());
    return this.http.delete<Recipe>(
      `http://localhost:5500/api/recipes/${index}`
    );
  }
}
