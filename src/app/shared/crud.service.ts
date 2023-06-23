import { Injectable } from '@angular/core';
import { Band } from '../shared/interfaces/Band';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {

  constructor(private db: AngularFireDatabase) { }

  updateBand(band: Band) {
    this.db.database.ref('bands-list/' + band.BandId).update(band);
  }

  async GetBand(id: string) {
    
    try {
      const resBand = await new Promise((resolve, reject) => {
        this.db.object('bands-list/' + id).valueChanges().pipe(take(1)).subscribe(data => {
          if (data === null) {
            reject(new Error(`band with id ${id} does not exists`));
          } 
          else {            
            resolve(<Band>data);
          }
        });
      });
      
      return resBand;
    }
    catch (error) {
      throw error;
    }
  }

  async GetBandsList() {
    try {
      const resBandList = await new Promise((resolve, reject) => {
        this.db.object('bands-list').valueChanges().pipe(take(1)).subscribe(data => {
          if (data === null) {
            reject(new Error('band list does not exist'));
          } 
          else {
            resolve(data);
          }
        });
      });
      
      return resBandList;
    }
    catch (error) {
      throw error;
    }
  }
}