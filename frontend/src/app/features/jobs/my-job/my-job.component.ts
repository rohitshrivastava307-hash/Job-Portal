import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/core/services/jobs.service';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.css']
})
export class MyJobComponent implements OnInit{
  
  user:any
  jobs:any[]=[]
  jobservice=inject(JobsService)
  toast=inject(ToastrService)



  ngOnInit(){

    this.user=JSON.parse(localStorage.getItem('user')!)

    this.jobservice.getjobs().subscribe({


      
     next:(res:any)=>{

      this.jobs=res.data.filter((jobdata:any)=>jobdata.createdBy===this.user._id
      )
     },
       error:(err)=>{

        console.log(err)

      }

  })

  }

deleteJob(id:string){

  const confirmDelete =

  confirm(
    'Are you sure you want to delete this job?'
  )

  if(!confirmDelete){

    return

  }

  this.jobservice
  .deleteJob(id)
  .subscribe({

    next:(res:any)=>{

      this.toast.success(
        'Job deleted successfully',
        'Success'
      )

      this.jobs =
      this.jobs.filter(

        (job:any)=>

        job._id !== id

      )

    }

  })

}
  

}
