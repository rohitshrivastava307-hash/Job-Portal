import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/gaurds/auth.guard';
import { JobsListComponent } from './features/jobs/jobs-list/jobs-list.component';
import { JobsDetailsComponent } from './features/jobs/jobs-details/jobs-details.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateJobComponent } from './features/jobs/create-job/create-job.component';
import { MyJobComponent } from './features/jobs/my-job/my-job.component';
import { ApplicantsListComponent } from './features/applications/applicants-list/applicants-list.component';
import { MyApplicationsComponent } from './features/applications/my-applications/my-applications.component';
import { EditJobComponent } from './features/jobs/edit-job/edit-job.component';
import { RoleGuard } from './core/gaurds/roles.guard';
import { LandingComponent } from './features/landing/landing.component';

const routes: Routes = [

{
  path:'',
  component:LandingComponent
},
  {path:'login',
    component:LoginComponent
  },
   {path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
  path:'jobs',

  component:JobsListComponent,

  canActivate:[
    AuthGuard,
    RoleGuard
  ],

  data:{
    role:'job_seeker'
  }

},
  {path:'jobs/:id',
    component:JobsDetailsComponent,
    canActivate:[AuthGuard]
  },
   {path:'register',
    component:RegisterComponent
  },
  {
  path:'create-job',

  component:CreateJobComponent,

  canActivate:[
    AuthGuard,
    RoleGuard
  ],

  data:{
    role:'recruiter'
  }

},
   {path:'my-jobs',
    component:MyJobComponent,
    canActivate:[AuthGuard]
  },
  {
  path:'applications/:id',
  component:ApplicantsListComponent,
  canActivate:[AuthGuard]
},
{
  path:'my-applications',
  component:MyApplicationsComponent,
  canActivate:[AuthGuard]
},
{
  path:'edit-job/:id',
  component:EditJobComponent,
  canActivate:[AuthGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {




  

   }
