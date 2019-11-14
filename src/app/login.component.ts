import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonServiceService } from './common-service.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
interface responseObject {
  status: String, field: string, message: string,unique_id?:any
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  uri: string;
  formdataObj: Object = {};
  loginActionStart: boolean;

  constructor(private CommonServiceService: CommonServiceService, private http: HttpClient,private route: ActivatedRoute,
    private router: Router) {
    this.uri = this.CommonServiceService.uri;
  }

  ngOnInit() {

  }

  resetColor() {
    this.errorMessage ='';  
    this.successMessage='';
    document.getElementById('useremail').style.borderColor = "";
    document.getElementById('userpassword').style.borderColor = "";

  }
  loginFunction(useremail, userpassword) {
    this.resetColor();


    this.formdataObj = { "action_type": "login", "useremail": useremail.value, "userpassword": userpassword.value };



    this.loginActionStart = true;
    this.http.post<responseObject>(this.uri + 'credential.php', this.formdataObj)
      .subscribe(res => {

        if (res.status == 'ERROR') {
          this.loginActionStart = false;

          this.errorMessage = res.message;
          if (res.field == 'ALL') {
            document.getElementById('useremail').style.borderColor = "red";
            document.getElementById('userpassword').style.borderColor = "red";

          }
          if (res.field == 'useremail') {
            document.getElementById('useremail').style.borderColor = "red";

          }
          if (res.field == 'userpassword') {
            document.getElementById('userpassword').style.borderColor = "red";

          }

        } else if (res.status == 'ERROR-2') {
          this.errorMessage = res.message+"";this.loginActionStart = false;
        }else {this.loginActionStart = false;
          this.successMessage = res.message;
          localStorage.setItem('unique_id',res.unique_id);
          setTimeout(() => {
            this.router.navigate(['profile']);
        }, 2000);
        }


      });
  }

}
