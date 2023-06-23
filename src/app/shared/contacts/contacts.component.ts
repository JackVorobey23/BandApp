import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { BandService } from '../band.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, OnDestroy {
  constructor(private bandService: BandService) { }

  public map: L.Map | undefined;
  public subscribtion: Subscription | undefined;

  ngOnInit(): void {

    const location = this.bandService.BandDataSubject.getValue().Location;


    this.subscribtion = this.bandService.BandData$.subscribe(data => {
      console.log(data.Location);
      this.displayMap(data.Location);

    })

    this.displayMap(location);
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }

  displayMap(location: [number, number]) {
    this.map?.remove();
    
    this.map = L.map('band-map-container', {
      center: location,
      zoom: 16,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.circle(location, { radius: 20 }).addTo(this.map);
  }
}