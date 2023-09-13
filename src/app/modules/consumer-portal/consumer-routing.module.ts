import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeConsumerShellComponent } from './pages/home-consumer-shell/home-consumer-shell.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { AddClaimComponent } from './components/add-claim/add-claim.component';

const routes: Routes = [
  { path: '', component: HomeConsumerShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeContentComponent  },
      { path: 'enrollments', component: EnrollmentsComponent },
      { path: 'claims', component: ClaimsComponent},
      { path: 'claims/add', component: AddClaimComponent  },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule {}
