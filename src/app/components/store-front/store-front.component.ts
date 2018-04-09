import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ProductService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})

export class StoreFrontComponent implements OnInit {
  products: Product[];
  product: Product;
  suscription : ISubscription;

  public constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) {
  }

  onSearchProducts() {
    this.suscription = this.productService.findAllProducts().
      subscribe(products => {
        this.products = products;
        console.log(this.products);
      })
  }

  onSearchProduct(id: number) {
    this.suscription = this.productService.findProductById(id)
    .subscribe(product => {
      this.product = product;
    })
  }

  onDeleteProduct(id: number) {
    this.suscription = this.productService.deleteProduct(id)
    .subscribe(response => {
      console.log(response);
    })
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
          .get()
          .subscribe((cart) => {
            obs.next(cart.items.some((i) => i.ProductId === product.Id));
            obs.complete();
          });
      sub.unsubscribe();
    });
  }

   ngOnInit() {
    this.onSearchProducts();
    console.log("init");
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}
