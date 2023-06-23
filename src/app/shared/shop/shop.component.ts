import { Component, OnDestroy, OnInit } from '@angular/core';
import Product from '../interfaces/Product';
import { BandService } from '../band.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private bandService: BandService) { }

  public selectedProduct: string = "All";
  public Products: Product[] | undefined;
  public Cart: [[number, number]] | undefined; // [[ProductId, AmountOfProducts]]
  public reload = true;

  public subscribtion: Subscription | undefined;

  ngOnInit(): void {
    this.Products = this.bandService.BandDataSubject.getValue().Products;

    this.subscribtion = this.bandService.BandData$.subscribe(data => this.Products = data.Products)
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
    this.bandService.PurchaseData = this.Cart!;
  }

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.selectedProduct = target.value;
    }
    console.log(this.selectedProduct);

  }

  getProducts() {
    return this.Products?.filter(p => {
      if (this.selectedProduct === "All") {
        return true;
      }
      return p.Type === this.selectedProduct;
    })
  }

  addProduct(productId: number) {

    let existProduct = this.Cart?.find(c => c[0] == productId);
    console.log(existProduct);

    if (existProduct !== null && existProduct !== undefined) {

      let indexToChange = this.Cart?.indexOf(existProduct);

      if (this.Cart![indexToChange!][1] >= this.Products!.find(p => p.ProductId == productId)!.Amount) {
        return;
      }

      this.Cart![indexToChange!][1] += 1;
      console.log(this.Cart![indexToChange!][1]);

    } else {
      console.log(productId, 0);

      this.Cart?.push([productId, 0]);
    }

  }

  removeProduct(productId: number) {

    let existProduct = this.Cart?.find(c => c[0] == productId);

    if (existProduct !== null && existProduct !== undefined) {

      let indexToChange = this.Cart?.indexOf(existProduct);

      if (this.Cart![indexToChange!][1] <= 0) {
        return;
      }

      this.Cart![indexToChange!][1] -= 1;
      console.log(this.Cart![indexToChange!][1]);
    } else {
      console.log(productId, 0);
      this.Cart?.push([productId, 0]);
    }

  }

  getAmountToBy(id: number) {
    console.log(id);

    const amount = this.Cart?.find(c => c[0] == id);

    if (amount !== undefined) {
      console.log(amount[1].toString());

      return amount[1].toString();
    }
    console.log("0");

    return "0";
  }

  goToPurchase() {
    this.router.navigateByUrl('purchase');
  }
}

