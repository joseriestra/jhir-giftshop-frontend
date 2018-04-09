import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "app/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";
import { RestService } from "app/rest/rest.service";

let count = 0;

@Injectable()
export class ProductService extends RestService<Product> {

  product: Product;
  products: Product[];
  productsChanged = new EventEmitter<Product>();

  constructor(http: Http) {
      super(http);
  }
  
  findAllProducts() : Observable<Product[]> {
      return this.findAll("products");
  }

  findProductById(id: number) : Observable<Product> {
      return this.findById(id, "products");
  }

  saveProduct(product: Product) : Observable<Product> {
      return this.save(product, "products");
  }

  updateProduct(product: Product) : Observable<Product> {
      return this.update(product, "products");
  }

  deleteProduct(id: number) : Observable<Product> {
      return this.delete(id, "products");
  }

  findProductsByCategory(categoryId: number) {
      return this.findAllById(categoryId, "categories");
  }

  addToCart(product: Product) {
      this.products.push(product);
      this.productsChanged.emit(product);
  }
}
