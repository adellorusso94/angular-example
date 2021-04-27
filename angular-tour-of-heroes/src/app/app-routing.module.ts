import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // Lazy Loading routes configuration
  { 
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(
      m => m.CrisisCenterModule
    ),
    // Custom Preloading Strategy
    data: { preload: true }
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(
      m => m.AdminModule
    ),
    canLoad: [AuthGuard]
  },
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: SelectivePreloadingStrategyService
    }
  )],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategyService]
})
export class AppRoutingModule { }
