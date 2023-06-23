import { Component } from '@angular/core';
import { CrudService } from './shared/crud.service';
import { BandService } from './shared/band.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'BandApp';
}
