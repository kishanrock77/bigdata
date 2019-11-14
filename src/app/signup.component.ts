


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonServiceService } from './common-service.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
interface responseObject {
  status: String, field: string, message: string
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  uri: string;
  formdataObj: Object = {};
  signupActionStart: boolean;
  constructor(private CommonServiceService: CommonServiceService, private http: HttpClient,private route: ActivatedRoute,
    private router: Router) {
    this.uri = this.CommonServiceService.uri;
    this.successMessage = '';
  }

  ngOnInit() {

  }

  resetColor() {
    this.errorMessage ='';  this.successMessage='';
    document.getElementById('useremail').style.borderColor = "";
    document.getElementById('userpassword').style.borderColor = "";
    document.getElementById('userpassword_confirm').style.borderColor = "";
    document.getElementById('mobile').style.borderColor = "";
    document.getElementById('name').style.borderColor = "";
  }
  signUPFunction(useremail, userpassword, name, mobile, userpassword_confirm) {
    this.resetColor();
    
    this.formdataObj = { "action_type": "signup", "userpassword_confirm": userpassword_confirm.value,"name": name.value, "mobile": mobile.value, "useremail": useremail.value, "userpassword": userpassword.value };

    this.signupActionStart = true;
    this.http.post<responseObject>(this.uri + 'credential.php', this.formdataObj)
      .subscribe(res => {

        if (res.status == 'ERROR') {
          this.signupActionStart = false;

          this.errorMessage = res.message;
          if (res.field == 'ALL') {
            document.getElementById('useremail').style.borderColor = "red";
            document.getElementById('userpassword').style.borderColor = "red";
            document.getElementById('userpassword_confirm').style.borderColor = "red";
            document.getElementById('mobile').style.borderColor = "red";
            document.getElementById('name').style.borderColor = "red";

          }
          if (res.field == 'useremail') {
            document.getElementById('useremail').style.borderColor = "red";

          }
          if (res.field == 'userpassword') {
            document.getElementById('userpassword').style.borderColor = "red";

          }
          if (res.field == 'userpassword_confirm') {
            document.getElementById('userpassword_confirm').style.borderColor = "red";

          }
          if (res.field == 'mobile') {
            document.getElementById('mobile').style.borderColor = "red";

          }
          if (res.field == 'name') {
            document.getElementById('name').style.borderColor = "red";

          }

        } else {
          this.signupActionStart = false;
          this.successMessage = res.message;

         // setTimeout(function(){ this.router.navigate(["activate", { }]);},1000);
         
        }


      });
  }

}
