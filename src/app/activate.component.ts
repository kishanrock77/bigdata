 

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonServiceService } from './common-service.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
interface responseObject {
  status: String, field: string, message: string
}



@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})


export class ActivateComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  uri: string;
  formdataObj: Object = {};
  activateActionStart: boolean;
  constructor(private CommonServiceService: CommonServiceService, private http: HttpClient,private route: ActivatedRoute,
    private router: Router) {
    this.uri = this.CommonServiceService.uri;
    this.successMessage='';
  }

  ngOnInit() {

  }

  resetColor() {
    this.errorMessage ='';  this.successMessage='';
    document.getElementById('useremail').style.borderColor = "";
    document.getElementById('otp').style.borderColor = "";

  }
  activateFunction(useremail, otp) {
    this.resetColor();


    this.formdataObj = { "action_type": "activate", "useremail": useremail.value, "otp": otp.value };



    this.activateActionStart = true;
    this.http.post<responseObject>(this.uri + 'credential.php', this.formdataObj)
      .subscribe(res => {

        if (res.status == 'ERROR') {
          this.activateActionStart = false;

          this.errorMessage = res.message;
          if (res.field == 'ALL') {
            document.getElementById('useremail').style.borderColor = "red";
            document.getElementById('otp').style.borderColor = "red";

          }
          if (res.field == 'useremail') {
            document.getElementById('useremail').style.borderColor = "red";

          }
          if (res.field == 'otp') {
            document.getElementById('otp').style.borderColor = "red";

          }

        }  else {
          this.successMessage = res.message;

        }


      });
  }

}