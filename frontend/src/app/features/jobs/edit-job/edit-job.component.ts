import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/core/services/jobs.service';


@Component({
  selector:'app-edit-job',
  templateUrl:'./edit-job.component.html'
})

export class EditJobComponent
implements OnInit{
 toast=inject(ToastrService)
  jobForm!:FormGroup

  id!:string

  constructor(

    private route:ActivatedRoute,

    private router:Router,

    private jobservice:JobsService

  ){}

  ngOnInit(){

    this.jobForm =
    new FormGroup({

      title:new FormControl(
        null,
        Validators.required
      ),

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

    this.id =
    this.route.snapshot
    .paramMap.get('id')!

    this.jobservice
    .getJobById(this.id)

    .subscribe({

      next:(res:any)=>{

        console.log(res)

        this.jobForm.patchValue({

          title:res.data.title,

          company:res.data.company,

          desc:res.data.desc,

          location:res.data.location

        })

      },

      error:(err)=>{

        console.log(err)

      }

    })

  }

  onSubmit(){

    this.jobservice

    .updateJob(
      this.id,
      this.jobForm.value
    )

    .subscribe({

      next:(res:any)=>{

        console.log(res)
        this.toast.success(
  'Job updated successfully',
  'Success'
)

        alert('Job Updated')

        this.router.navigate(
          ['/my-jobs']
        )

      },

      error:(err)=>{

        console.log(err)

      }

    })

  }

}