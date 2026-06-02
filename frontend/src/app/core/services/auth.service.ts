import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {



apiUrl = environment.apiUrl + '/users';
http=inject(HttpClient)
login(data:any){


  return this.http.post( `${this.apiUrl}/login`,data)

}

autologin(){
  const token=localStorage.getItem('token')
}


logout(){
  localStorage.removeItem('token')
}



register(data:any){
  return this.http.post(`${this.apiUrl}/register`,data)
}





  
}
