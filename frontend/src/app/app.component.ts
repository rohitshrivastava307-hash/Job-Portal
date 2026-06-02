import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authservice=inject(AuthService)
  ngOnInit(){
   this.authservice.autologin()

    
  }
  title = 'frontend';


    showNavbar = true

  constructor(
    private router:Router
  ){

    this.router.events.subscribe(

      (event:any)=>{

        if(event instanceof NavigationEnd){

          const hiddenRoutes = [

            '/',
            '/login',
            '/register'

          ]

          this.showNavbar =

          !hiddenRoutes.includes(
            event.url
          )

        }

      }

    )

  }
}
