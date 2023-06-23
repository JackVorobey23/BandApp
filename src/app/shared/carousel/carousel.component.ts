import { Component, Input, OnInit } from '@angular/core';
import ImageDTO from '../interfaces/CarouselDTO';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) {

  }
  @Input() images: ImageDTO[] | undefined;

  public currentIndexes = [-1, 0, 1];

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 800px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.currentIndexes = [0];
      }
    });
  
    this.breakpointObserver.observe([
      '(min-width: 800px) and (max-width: 1050px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.currentIndexes = [0, 1];
      }
    });
  
    this.breakpointObserver.observe([
      '(min-width: 1050px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.currentIndexes = [0, 1, 2];
      }
    });
    console.log(this.images);

    this.getCurrentImages('right');

  }
  goToUrl(index: any) {

    console.log(this.images);

    let url = this.images![index].Url;

    if (url !== undefined && url !== null) {
      window.open(url, "_blank");
    }
    console.log(index);

  }
  getCurrentImages(direction: string) {

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
