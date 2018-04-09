import { Ingredient } from "app/models/ingredient.model";

export class Product {
  Id: number;
  ProductName: string;
  ProductCode: string;
  Description: string;
  Price: number;
  ImagePath: string;
  CategoryId: number;
  Available: boolean;

  public updateFrom(src: Product): void {
    this.Id = src.Id;
    this.ProductName = src.ProductName;
    this.ProductCode = src.ProductCode;
    this.Description = src.Description;
    this.Price = src.Price;
    this.ImagePath = src.ImagePath;
    this.CategoryId = src.CategoryId;
    this.Available = src.Available;
    /*this.ingredients = src.ingredients.map((i) => {
      let ingredient = new Ingredient();
      ingredient.updateFrom(i);
      return ingredient;
    });*/
  }
}
