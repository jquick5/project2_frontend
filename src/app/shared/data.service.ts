import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient, private rService: RecipeService) {}

  saveRecipes() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let options = { headers: headers };
    const recipes = this.rService.getRecipes();

    return this.http
      .post('http://localhost:5500/api/recipes', recipes, options)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
