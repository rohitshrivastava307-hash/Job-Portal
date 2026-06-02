import { Component, inject } from '@angular/core';
import { JobsService } from 'src/app/core/services/jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent {



  jobservice=inject(JobsService)

  jobs:any[]=[]
  loading = true
  errorMessage = ''

ngOnInit(){
  this.jobservice.getjobs()
  .subscribe({
    next:(res:any)=>{
      this.jobs=res.data
      this.loading=false
    },
   error:(err)=>{

  console.log(err)

  this.loading = false

  this.errorMessage =

  'Failed to load jobs. Please try again.'

}
  })
}

}
