import {
  HttpClient
} from '@angular/common/http';

import {
  inject,
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})

export class ApplicationService {

 
  apiUrl = environment.apiUrl + '/jobs';

 http=inject(HttpClient)

  getApplicants(id:string){

    return this.http.get(

      `${this.apiUrl}/${id}/applicants`
     

    )

  }



  updatestatus(id:any,status:any){
    return this.http.patch(`${this.apiUrl}/applications/${id}`,{status})

  }



  getMyApplications(){

  return this.http.get(

    `${this.apiUrl}/myapplications`

  )

}
}