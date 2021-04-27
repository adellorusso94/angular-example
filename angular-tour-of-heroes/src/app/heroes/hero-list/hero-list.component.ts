import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
//import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[] = [];
  //heroes$: Observable<Hero[]>;
  selectedId: number;
  //selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute 
    //private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //this.heroes$ = this.getHeroes();
    this.getHeroes().subscribe(
      value => this.heroes = value
    );
  }

  // Observable Methods
  getHeroes(): Observable<Hero[]> {
    return this.route.paramMap.pipe(
      switchMap(
        params => {
          this.selectedId = +Number(params.get('id'));
          return this.heroService.getHeroes();
        }
      )
    );
  }

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(List
    .name + `: Selected hero id=${hero.id}`);
  }*/

  // No Observable Methods
  /*
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }
  */

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(
      hero => {
        this.heroes.push(hero);
      }
    )
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
}
