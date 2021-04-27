import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Crisis } from 'src/app/models/crisis';
import { CrisisCenterService } from 'src/app/services/crisis-center.service';

@Component({
  selector: 'app-crisis',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  crisis$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private crisisCenterService: CrisisCenterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crisis$ = this.getCrisis();
  }

  // Observable Methods
  getCrisis(): Observable<Crisis[]> {
    return this.route.paramMap.pipe(
      switchMap(
        params => {
          this.selectedId = +Number(params.get('id'));
          return this.crisisCenterService.getAllCrisis();
        }
      )
    );
  }
  
}
