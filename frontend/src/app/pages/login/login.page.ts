import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router } from '@angular/router';
import { Users } from '../../models/Users';
import { Persist } from '../../persist';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = { username: '', password: '' }
  errorMsg:string = '';
  currentUser:Users;
  isLoggedIn: boolean = false;

  constructor(public httpService: HttpService,  private router: Router, public persist: Persist) { 
    if (this.persist.currentUserName && this.persist.currentUserName.length != 0) {
      this.isLoggedIn = true;
    }
    if (this.isLoggedIn){
      this.router.navigate(['/']);
    }
    
  }

  ionViewWillEnter(){
    this.errorMsg = '';
    this.loginForm.username = ''; this.loginForm.password = '';
  }

  ngOnInit() {
  }

  authenticateUser(username, password) {
    this.httpService.authenticateUser(username, password).subscribe(data => {
      console.log(`data returned: ${JSON.stringify(data)}`);
      if (data.length != 0 && !data.error && data[0].username) {

        this.currentUser = data[0];
        // navigate to home page
        this.persist.setCurrentUserName(this.currentUser.username);
        this.router.navigate(['/home']);
        

      } else {
        this.errorMsg = data.error;
      }
    }, error => {
      console.log("error during authenticateUser: ", error);
      return false;
    })
  }

}
