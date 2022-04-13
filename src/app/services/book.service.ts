import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _httpClient: HttpClient, private _auth: AuthService) { }

  // savebook(books : any[] ){
  //   const tk = this._auth.gettoken();
  //   return this._httpClient.post("https://httproject-319cb-default-rtdb.asia-southeast1.firebasedatabase.app/data.json",books)
  // }

  // getbook(){
  //   const tk = this._auth.gettoken();
  //   return this._httpClient.get("https://httproject-319cb-default-rtdb.asia-southeast1.firebasedatabase.app/book/data.json? auth="+tk)
  // }

  apiUrl = 'http://localhost:3000/book';

  // get all data 
  getAllData(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  // create data

  createData(data: any): Observable<any> {
    console.log(data, 'createapi=>')
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //delete 

  deleteData(id: any): Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

  //update
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data)
  }

  getsingleData(id: any): Observable<any> {
    let ids = id;
    return this._httpClient.get(`${this.apiUrl}/${ids}`);
  }

}
