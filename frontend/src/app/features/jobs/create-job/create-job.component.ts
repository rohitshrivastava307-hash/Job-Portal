import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/core/services/jobs.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
   toast=inject(ToastrService)
  jobservice=inject(JobsService)
  router=inject(Router)
   jobForm!:FormGroup
  ngOnInit(){

 this.jobForm=new FormGroup({
  title:new FormControl(null,Validators.required),
  company:new FormControl(
        null,
        Validators.required
      ),

      desc:new FormControl(
        null,
        Validators.required
      ),
      location:new FormControl(
  null,
  Validators.required
)

 })



 
  }
  onSubmit(){
   this.jobservice.createjob(this.jobForm.value).subscribe({
    next:(res:any)=>{
      alert('job created')
      this.toast.success(
  'Job created successfully',
  'Success'
)
      this.router.navigate(['/jobs'])
    },

    error:(e)=>{
      console.log(e)
    }

   })
 }
    
  

}
