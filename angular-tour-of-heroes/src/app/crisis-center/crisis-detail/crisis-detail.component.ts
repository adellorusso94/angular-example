import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Crisis } from 'src/app/models/crisis';
import { CrisisCenterService } from 'src/app/services/crisis-center.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      }
    );
  }

  save(): void {
    this.crisis.name = this.editName;
    this.gotoCrisis();
  }

  cancel() {
    this.gotoCrisis();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrisis() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(
      ['../', { id: crisisId}], { relativeTo: this.route}
    );
  }

}
