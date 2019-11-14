 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonServiceService } from './common-service.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
interface responseObject {
  status: String, field: string, message: string
}


@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.css']
})

export class ForgetpwdComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  uri: string;
  formdataObj: Object = {};
  forgetActionStart: boolean;
  constructor(private CommonServiceService: CommonServiceService, private http: HttpClient,private route: ActivatedRoute,
    private router: Router) {
    this.uri = this.CommonServiceService.uri;
  }

  ngOnInit() {

  }

  resetColor() {
    this.errorMessage ='';  this.successMessage='';
    document.getElementById('useremail').style.borderColor = "";
    

  }
  forgetFunction(useremail) {
    this.resetColor();


    this.formdataObj = { "action_type": "forget", "useremail": useremail.value  };



    this.forgetActionStart = true;
    this.http.post<responseObject>(this.uri + 'credential.php', this.formdataObj)
      .subscribe(res => {

        if (res.status == 'ERROR') {
          this.forgetActionStart = false;

          this.errorMessage = res.message;
          if (res.field == 'ALL') {
            document.getElementById('useremail').style.borderColor = "red";
           

          }
          if (res.field == 'useremail') {
            document.getElementById('useremail').style.borderColor = "red";

          }
           

        }  else {
          this.successMessage = res.message;

        }


      });
  }

}
