import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  authservice=inject(AuthService)
  router=inject(Router)
user:any

ngOnInit(){

  this.user = JSON.parse(
    localStorage.getItem('user')!
  )

}
  logout(){
this.authservice.logout()

this.router.navigate(['login'])
  }
}
