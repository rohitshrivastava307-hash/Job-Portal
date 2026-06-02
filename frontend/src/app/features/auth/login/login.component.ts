import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    authService=inject(AuthService)
    router=inject(Router)
    toast=inject(ToastrService)

  reactiveform!:FormGroup

  ngOnInit(){
    this.reactiveform=new FormGroup({
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })

  }



    onSubmit() {

  
    this.authService.
    login(this.reactiveform.value)
    .subscribe({
      next:(res:any)=>{

  this.toast.success(

    'Login Successful'

  )
localStorage.setItem('token',res.token)
localStorage.setItem(
  'user',
  JSON.stringify(res.data)
)
this.router.navigate(['/home'])
      },
      error:(err)=>{

  this.toast.error(

    'Invalid Credentials'

  )
       

      }

    })

  }
}
