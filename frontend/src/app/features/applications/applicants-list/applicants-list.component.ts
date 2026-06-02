import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/core/application.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {
 
  applicants:any[]=[]
appservice=inject(ApplicationService)
route=inject(ActivatedRoute)
toast=inject(ToastrService)
   ngOnInit() {
   const id=this.route.snapshot.paramMap.get('id')

   this.appservice.getApplicants(id!).subscribe({
      next:(res:any)=>{

        

        this.applicants = res.data

      },

       error:(err)=>{

        console.log(err)

      }

   })
  }

updateStatus(id:any,status:any){


  this.appservice.updatestatus(id,status).subscribe({
     next:(res:any)=>{

    
this.toast.success(
  'Applicant status updated',
  'Success'
)

    },
   error:(err)=>{

      console.log(err)

    }

  })
}

  
}
