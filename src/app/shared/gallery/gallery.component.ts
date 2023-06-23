import { Component, OnInit } from '@angular/core';
import Product from '../interfaces/Product';
import { CrudService } from '../crud.service';
import { BandService } from '../band.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  constructor(private crudService: CrudService, private bandService: BandService) { }

  public selectedProduct: string | undefined;
  public Products: Product[] | undefined;
  
  public subscribtion: Subscription | undefined;

  ngOnInit(): void {
    this.Products = this.bandService.BandDataSubject.getValue().Products;

    this.subscribtion = this.bandService.BandData$.subscribe(data => this.Products = data.Products)
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
