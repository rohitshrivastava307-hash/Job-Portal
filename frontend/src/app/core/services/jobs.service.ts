import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http=inject(HttpClient)

  constructor() { }

apiUrl = environment.apiUrl + '/jobs';


  getjobs(){
    return this.http.get(this.apiUrl)
  }



  
  getJobById(id:string){
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  applyJob(id:string){
  return this.http.post(`${this.apiUrl}/${id}/apply`,{})
  }


  createjob(data:any){
    return this.http.post(`${this.apiUrl}/createjobs`,data)
  }


  deleteJob(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`)

  }

  updateJob(

  id:string,

  data:any

){

  return this.http.patch(

    `${this.apiUrl}/${id}`,

    data

  )

}
  
}
