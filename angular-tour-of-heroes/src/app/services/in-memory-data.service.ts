import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Crisis } from '../models/crisis';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes: Hero [] = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const crisis: Crisis[] = [
      { id: 1, name: 'Dragon Burning Cities' },
      { id: 2, name: 'Sky Rains Great White Sharks' },
      { id: 3, name: 'Giant Asteroid Heading For Earth' },
      { id: 4, name: 'Procrastinators Meeting Delayed Again' },
    ];
    return { heroes, crisis };
  }
  
  // Overrides the genId method to ensure that a hero/crisis always has an id.
  // If the heroe/crisis array is empty,
  // the method below returns the initial number (11).
  // if the heroes/crisis array is not empty, the method below returns the highest
  // hero/crisis id + 1.
  genId<T extends Hero | Crisis>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }

}
