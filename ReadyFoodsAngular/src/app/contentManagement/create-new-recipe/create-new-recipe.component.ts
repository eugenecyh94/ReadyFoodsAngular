import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientSpecification } from 'src/app/models/ingredient-specification';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-create-new-recipe',
  templateUrl: './create-new-recipe.component.html',
  styleUrls: ['./create-new-recipe.component.css']
})
export class CreateNewRecipeComponent implements OnInit {

  categories: Category[];

  recipes: Recipe[];
  recipeToView: Recipe;
  recipeCategories: Category[];

  ingredients: Ingredient[];
  ingredientSpecification: IngredientSpecification[];
  newRecipe: Recipe;

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private recipeService: RecipeService,
    private categoryService: CategoryService) {
    this.categories = [];
    this.recipes = [];
    this.recipeToView = new Recipe();
    this.recipeCategories = [];
    this.ingredients = [];
    this.ingredientSpecification = [];
    this.newRecipe = new Recipe();

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.recipeService.getAllRecipes().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => {
        console.log('********** ViewAllRecipes.ts: ' + error);
      }
    });

    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log('********** ViewAllParentCategories.ts: ' + error);
      },
    });
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

}
