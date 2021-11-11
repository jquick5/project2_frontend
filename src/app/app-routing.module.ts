import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        runGuardsAndResolvers: 'always',
      },
    ],
  },
  {
    path: 'list',
    component: ShoppingListComponent,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
