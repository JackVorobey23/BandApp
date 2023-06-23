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
  public PurchaseInfo: [number, number][] = [];
  public FinalCost: number = 0;
  public BandInfo: Band = this.bandService.BandDataSubject.getValue();

  ngOnInit(): void {
    if(this.bandService.PurchaseData !== undefined) {
      this.PurchaseInfo = this.bandService.PurchaseData;
    }
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
      
      products.push({
        Amount: pi[1],
        Cost: pi[1] * tempProduct!.Cost,
        ProductName: tempProduct?.Name
      })
    }
    this.FinalCost = products.reduce((prev, curr) => prev + curr.Cost, 0)
    return products;
  }

  ngOnDestroy(): void {
    
  }
}
