import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandService } from '../band.service';
import { CrudService } from '../crud.service';
import { Band } from '../interfaces/Band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {
  constructor(private crudService: CrudService, private bandService: BandService, private router: Router) { }
  public PurchaseInfo: [[number, number]] | undefined;
  public BandInfo: Band = this.bandService.BandDataSubject.getValue();

  ngOnInit(): void {
    if(this.bandService.PurchaseData !== undefined) {
      this.PurchaseInfo = this.bandService.PurchaseData;
    }
    console.log(this.PurchaseInfo);
  }
  
  Buy() {

  }

  Cancel() {
    this.router.navigateByUrl('shop');
  }

  GetProducts() {
    let products = [];
    for(let pi of this.PurchaseInfo!) {

      let tempProduct = this.BandInfo.Products.find(p => p.ProductId === pi[0]);
      console.log(tempProduct);
      
      products.push({
        Amount: pi[1],
        Cost: pi[1] * tempProduct!.Cost,
        ProductName: tempProduct?.Name
      })
    }

    return products;
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
