
import { Http } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RestService } from "../rest/rest.service";
import { Category } from "app/models/category.model";

@Injectable()
export class CategoryService extends RestService<Category> {
    category: Category;
    categories: Category[];
    categorySelected = new EventEmitter<Category>();

    constructor(http: Http) {
        super(http);
    }
    
    findAllCategories() : Observable<Category[]> {
        return this.findAll("categories");
    }
}