import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { CompanyListComponent } from './features/companies/company-list/company-list.component';
import { ReviewListComponent } from './features/reviews/review-list/review-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
