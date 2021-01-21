import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // public URL: string = "http://localhost:8080/";
  public URL: string = "http://157.230.242.73:8080/";

  constructor(public http: HttpClient) { }

  public authenticateUser(username: string, password: string): Observable<any> {
    var data = {
      "username": username,
      "password": password
    }



    return this.http.post(this.URL + "login", data)
      .catch((error: Response) => {
        return Observable.throw(error);
      });

  }

  public registerUser(username: string, password: string): Observable<any> {
    var data = {
      "username": username,
      "password": password
    }

    return this.http.post(this.URL + "signUp", data)
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.URL )
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  public logout(): Observable<any> {

    return this.http.delete(this.URL + "logout")
      .catch((error: Response) => {
        return Observable.throw(error);
      });

  }
}
