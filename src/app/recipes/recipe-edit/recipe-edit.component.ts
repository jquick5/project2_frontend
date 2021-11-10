import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnChanges {
  id: number;
  recipe: Recipe;
  recipes: Recipe[];
  editMode = false;
  recipeForm: FormGroup;
  userId: string = localStorage.getItem('userId');
  strIng: string[];

  constructor(
    private route: ActivatedRoute,
    private rService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rService.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.userId;
      });
    });
  }

  ngOnChanges() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['Your actualComponent']);
      });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      0,
      this.recipeForm.value['name'],
      this.recipeForm.value['category'],
      0,
      this.recipeForm.value['prepMethod'].trim(),
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'].split(', '),
      parseInt(this.userId)
    );

    if (this.editMode) {
      let rId = this.recipes[this.id].recipeId;
      let ownerId = this.recipes[this.id].userId;
      const updateRecipe = new Recipe(
        rId,
        this.recipeForm.value['name'],
        this.recipeForm.value['category'],
        0,
        this.recipeForm.value['prepMethod'].trim(),
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients'].split(', '),
        ownerId
      );
      console.log(newRecipe);
      this.rService.updateRecipe(rId, updateRecipe).subscribe((data) => {
        console.log(data);
      });
    }
    console.log('called');
    this.rService.addRecipe(newRecipe).subscribe((data) => {
      console.log('Recipe added');
    });

    this.onCancel();
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  //*ngFor="let ingredientCtrl of controls; let i = index"

  private initForm() {
    let rId;
    let recipeName = '';
    let recipeCategory = '';
    let recipePrepMethod = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = [];
    let numOfLikes;
    let userId;

    if (this.editMode) {
      this.rService
        .getRecipe(this.recipes[this.id].recipeId)
        .subscribe((data) => {
          console.log(data);
          rId = data.recipeId;
          recipeName = data.name;
          recipeImage = data.imagePath;
          recipeCategory = data.category;
          recipePrepMethod = data.prepMethod;
          recipeDescription = data.description;
          recipeIngredients = data.ingredients;
          numOfLikes = data.numOfLikes;
          userId = data.userId;

          this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            description: new FormControl(
              recipeDescription,
              Validators.required
            ),
            imagePath: new FormControl(recipeImage, Validators.required),
            category: new FormControl(recipeCategory, Validators.required),
            prepMethod: new FormControl(recipePrepMethod, Validators.required),
            ingredients: new FormControl(
              recipeIngredients,
              Validators.required
            ),
          });
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      category: new FormControl(recipeCategory, Validators.required),
      prepMethod: new FormControl(recipePrepMethod, Validators.required),
      ingredients: new FormControl(recipeIngredients, Validators.required),
    });
  }
}
