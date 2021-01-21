import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router } from '@angular/router';
import { Users } from '../../models/Users';
import { Persist } from '../../persist';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  signUpForm = { username: '', password: '' }
  errorMsg:string = '';
  constructor(public httpService: HttpService,  private router: Router, public persist: Persist) { }

  ionViewWillEnter(){
    this.errorMsg = '';
    this.signUpForm.username = ''; this.signUpForm.password = '';
  }

  ngOnInit() {
  }

  registerUser(username, password) {
    this.httpService.registerUser(username, password).subscribe(data => {
      console.log(`data returned from registerUser: ${JSON.stringify(data)}`);
      if (data.length != 0 && !data.error && data.username) {
        // navigate to login page
        this.router.navigate(['/login']);
      } else {
        this.errorMsg = data.error;
      }
    }, error => {
      console.log("error during registerUser: ", error);
      return false;
    })
  }

}
