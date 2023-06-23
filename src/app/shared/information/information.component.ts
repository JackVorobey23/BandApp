import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Band } from '../interfaces/Band';
import { BandService } from '../band.service';
import { Subscription, throwError } from 'rxjs';

import ImageDTO from '../interfaces/CarouselDTO';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, OnDestroy {

  constructor(private crudService: CrudService, private bandService: BandService) { }

  public BandInfo?: Band;
  public currentAlbums: ImageDTO[] | undefined;
  public currentSocialMedia: ImageDTO[] | undefined;
  public currentMusicPlatforms: ImageDTO[] | undefined;
  private subscribtion?: Subscription;

  ngOnInit() {
    this.BandInfo = this.bandService.BandDataSubject.getValue();

    this.subscribtion = this.bandService.BandData$.subscribe(data => {

      this.BandInfo = data;

      this.currentAlbums = this.getAlbums();
      this.currentSocialMedia = this.getSocMedias();
      this.currentMusicPlatforms = this.getMusicPlatforms();
    });
  }

  getAlbums() {
    return this.BandInfo!.Albums.map(a => <ImageDTO>{
      ImageUrl: a.ImageUrl,
      Caption: a.Name
    });
  }

  getSocMedias() {
    return this.BandInfo!.SocialMedia.map(sm => <ImageDTO>{
      ImageUrl: sm.ImageUrl,
      Caption: sm.Name,
      Url: sm.Url
    });
  }

  getMusicPlatforms() {
    return this.BandInfo!.MusicPlatforms.map(mp => <ImageDTO>{
      ImageUrl: mp.ImageUrl,
      Caption: mp.Name,
      Url: mp.Url
    });
  }

  ngOnDestroy() {
    this.subscribtion?.unsubscribe();
  }
}
