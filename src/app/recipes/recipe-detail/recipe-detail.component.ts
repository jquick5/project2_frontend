import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipes: Recipe[];
  recipe: Recipe;
  id: number;
  recipeId: number;

  constructor(
    private rService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rService.getRecipes().subscribe((data) => {
      this.recipes = data;
      console.log(this.recipes);
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipes[this.id];
        this.recipeId = this.recipes[this.id].recipeId;
      });
    });
  }

  onAdd() {
    //this.rService.addToList(this.recipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.rService.deleteRecipe(this.recipeId).subscribe((data) => {
      console.log('Recipe Deleted');
      this.rService.getRecipes().subscribe();
    });
    this.router.navigate(['/recipes']);
  }
}
