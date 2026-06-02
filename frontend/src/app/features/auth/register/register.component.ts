import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
authservice=inject(AuthService)
router=inject(Router)
 toast=inject(ToastrService)
  registerForm!:FormGroup
ngOnInit(){

  this.registerForm=new FormGroup({
    name:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    confirmPassword:new FormControl(null,Validators.required),

    role:new FormControl('job_seeker')


  })


}


 onSubmit(){

  this.authservice.register(this.registerForm.value).subscribe({
    next:(res:any)=>{
      this.toast.success(
  'Account created successfully',
  'Success'
)
   localStorage.setItem('token',res.toke)
   localStorage.setItem('user',JSON.stringify(res.data))
    this.router.navigate(['/home'])
    },
    error:(e)=>{
      console.log(e)
    }
  })

  }

}
