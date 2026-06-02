import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/core/services/jobs.service';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.css']
})
export class JobsDetailsComponent implements OnInit {

  job:any
toast=inject(ToastrService)
  route=inject(ActivatedRoute)
  jobservice=inject(JobsService)
  ngOnInit(){
const id=this.route.snapshot.paramMap.get('id')
 this.jobservice.getJobById(id!).subscribe({
  next:(res:any)=>{
    this.job= res.data
  },


  error:(e)=>{
    console.log(e)
  }
 })
  }



  applyJob(){
    this.jobservice.applyJob(this.job._id).subscribe({
      next:(res:any)=>{
         this.toast.success(
  'Application submitted',
  'Success'
)
      },

      error:(e)=>{
        console.log(e)

      }
    })
  }
  

}
