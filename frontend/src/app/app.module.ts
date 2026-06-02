import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { HomeComponent } from './features/home/home.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { JobsListComponent } from './features/jobs/jobs-list/jobs-list.component';
import { JobsDetailsComponent } from './features/jobs/jobs-details/jobs-details.component';
import { CreateJobComponent } from './features/jobs/create-job/create-job.component';
import { MyJobComponent } from './features/jobs/my-job/my-job.component';
import { ApplicantsListComponent } from './features/applications/applicants-list/applicants-list.component';
import { MyApplicationsComponent } from './features/applications/my-applications/my-applications.component';
import { EditJobComponent } from './features/jobs/edit-job/edit-job.component';
import { LandingComponent } from './features/landing/landing.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LoadingComponent } from './features/loading/loading.component';
import { ErrorstateComponent } from './features/errorstate/errorstate.component';
import { EmptystateComponent } from './features/emptystate/emptystate.component';
import { BrowserAnimationsModule }
from '@angular/platform-browser/animations';

import { ToastrModule }
from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobsListComponent,
    JobsDetailsComponent,
    CreateJobComponent,
    MyJobComponent,
    ApplicantsListComponent,
    MyApplicationsComponent,
    EditJobComponent,
    LandingComponent,
    NavbarComponent,
    LoadingComponent,
    ErrorstateComponent,
    EmptystateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
ReactiveFormsModule,AuthModule,
BrowserModule,

  BrowserAnimationsModule,

  ToastrModule.forRoot({

    positionClass:
    'toast-top-right',

    timeOut: 3000,

    closeButton: true,

    progressBar: true

  })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
