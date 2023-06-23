import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Band } from './interfaces/Band';
import ThemeColors from './interfaces/ThemeColors';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  
  public BandDataSubject = new BehaviorSubject<Band>({
    BandId: -1,
    Title: "",
    Albums: [],
    DateOfFoundation: new Date(2000,1,1),
    MusicPlatforms: [],
    Products: [],
    SocialMedia: [],
    ThemeColors: <ThemeColors> {
      Background: "",
      Darker: "",
      Lighter: ""
    },
    BandLogo: ""
  });

  public BandData$: Observable<Band> = this.BandDataSubject.asObservable();

  public PurchaseData: [[number, number]] = [[0,0]];

  constructor() { }
}
