import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { BandService } from '../band.service';
import { Band } from '../interfaces/Band';
import { Subscription } from 'rxjs';
import ThemeColors from '../interfaces/ThemeColors';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('changeBackground', [
      state('start', style({
        background: 'linear-gradient(to right, #0000ff, #00ff00)',
      })),
      state('end', style({
        background: 'linear-gradient(to right, #ff0000, #ffff00)',
      })),
      transition('start <=> end', animate('2s')),
    ]),
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private crudService: CrudService, private bandService: BandService) { }

  public bandTitle: string | undefined;
  private subscription: Subscription | undefined;

  async ngOnInit() {
    
    const currentBand = <Band>(await this.crudService.GetBand("1"));
    this.bandService.BandDataSubject.next(currentBand);
    
    console.log("1", this.bandService.BandDataSubject.getValue());

    this.bandTitle = currentBand.Title;
    this.changeColorTheme(currentBand.ThemeColors, currentBand.BandLogo);

    this.subscription = this.bandService.BandData$.subscribe(data => {
      this.bandTitle = data.Title;
      this.changeColorTheme(data.ThemeColors, data.BandLogo);
    });

  }
  public async GetPrevBand() {

    const prevBandId = this.bandService.BandDataSubject.getValue().BandId - 1;

    if (prevBandId < 0) {
      console.log("Current Band is the first!");
      return;
    }

    const prevBand = <Band>(await this.crudService.GetBand(prevBandId.toString()));

    this.bandService.BandDataSubject.next(prevBand);

  }

  public changeColorTheme(themeColors: ThemeColors, logoUrl: string) {
    (document.getElementsByClassName('nav-main')[0] as HTMLElement).style.background = `linear-gradient(150deg, ${themeColors.Darker} 39%, ${themeColors.Lighter} 89%)`;
    
    (document.querySelector('body') as HTMLElement).style.backgroundColor = `${themeColors.Background}`;
    
    (document.getElementsByClassName('background-image')[0] as HTMLElement).style.backgroundImage = `url(${logoUrl})`;
  }
  

  public async GetNextBand() {

    const nextBandId = this.bandService.BandDataSubject.getValue().BandId + 1;

    if (nextBandId > 2) {
      console.log("Current Band is the last!");
      return;
    }

    const prevBand = <Band>(await this.crudService.GetBand(nextBandId.toString()));

    this.bandService.BandDataSubject.next(prevBand);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
