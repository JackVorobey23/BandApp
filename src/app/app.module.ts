import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './shared/nav/nav.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { ShopComponent } from './shared/shop/shop.component';
import { InformationComponent } from './shared/information/information.component';
import { PurchaseComponent } from './shared/purchase/purchase.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, NavComponent, GalleryComponent, ShopComponent, InformationComponent, PurchaseComponent, CarouselComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'information', component: InformationComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: '', redirectTo: '/information', pathMatch: 'full' }
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
