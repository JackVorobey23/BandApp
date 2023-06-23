import { Component, Input, OnInit } from '@angular/core';
import ImageDTO from '../interfaces/CarouselDTO';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: ImageDTO[] | undefined;

  public currentIndexes = [-1, 0, 1];

  ngOnInit() {
    console.log(this.images);

    this.getCurrentImages('right');

  }
  goToUrl(index: any) {
    
    console.log(this.images);
    
    let url = this.images![index].Url;

    if(url !== undefined && url !== null) {
      window.open(url, "_blank");
    }
    console.log(index);
    
  }
  getCurrentImages(direction: string) {
    
      console.log("asdasd");

      if (direction === 'right') {

        this.currentIndexes = this.currentIndexes.map(ci => this.next(ci));
      } 
      else if (direction === 'left') {

        this.currentIndexes = this.currentIndexes.map(ci => this.previous(ci));
      } 
      else {
        console.log('wrong direction');
      }
      console.log(this.currentIndexes);
  }

  next(index: number) {
    return (index === this.images!.length - 1) ? 0 : index + 1;
  }

  previous(index: number) {
    return (index === 0) ? this.images!.length - 1 : index - 1;
  }
}
