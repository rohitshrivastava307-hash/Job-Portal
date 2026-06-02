import { Component, inject, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/application.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
 

  appservice=inject(ApplicationService)
  applications:any[]=[]
ngOnInit(){
     

  this.appservice.getMyApplications().subscribe({
        next:(res:any)=>{

      



        this.applications =

  res.data.filter(

    (application:any)=>

    application.job

  )

      },

       error:(err)=>{

        console.log(err)

      }
  })
}



}
