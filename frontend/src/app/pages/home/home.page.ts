import { Component } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
import { HttpService } from "../../services/http.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../models/Products';
import { Users } from '../../models/Users';
import { Persist } from '../../persist';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  currentUsername: string = '';
  errorMsg: string = '';
  isLoggedIn: boolean = false;
  productsList: Products[];

  constructor(private data: DataService, public httpService: HttpService, private router: Router, private route: ActivatedRoute, public persist: Persist) {

  };

  ngOnInit() {

  }



  ionViewWillEnter() {
    if (this.persist.currentUserName && this.persist.currentUserName.length != 0) {
      this.currentUsername = this.persist.currentUserName;
      this.isLoggedIn = true;
    }

    if (this.isLoggedIn) {
      this.httpService.getProducts().subscribe(data => {
        //if( data && data.userType != undefined ){
        // console.log(`data returned: ${JSON.stringify(data)}`);
        if (data.length != 0 && !data.error && data[0].productId) {
          console.log(`product listing: ${JSON.stringify(data)}`);
          this.productsList = data;

        } else {
          // console.log(`data.message: ${data.error}`);
          this.errorMsg = data.error;
          alert(this.errorMsg);
          this.router.navigate(['/login']);
        }
      }, error => {
        console.log("error during getproducts: ", error);
        return false;
      })
    }
    else {
      this.router.navigate(['/login']);
    }
  }


  // refresh(ev) {
  //   setTimeout(() => {
  //     ev.detail.complete();
  //   }, 3000);
  // }

  // getMessages(): Message[] {
  //   return this.data.getMessages();
  // }

  logout() {
    this.httpService.logout().subscribe(data => {
      this.router.navigate(['/login']);
    }, error => {
      console.log("error during logout: ", error);
      return false;
    })
  }

}