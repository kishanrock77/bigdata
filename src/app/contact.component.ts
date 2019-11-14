import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonServiceService } from './common-service.service';

interface responseObject {
  status: String, field: string, message: string
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  
  errorMessage: string;
  successMessage: string;
  uri: string;
  formdataObj: Object = {};
  contactActionStart: boolean;
  constructor(private CommonServiceService: CommonServiceService, private http: HttpClient ) {
    this.uri = this.CommonServiceService.uri;
  }

  ngOnInit() {

  }

  resetColor() {
    this.errorMessage ='';  this.successMessage='';
    document.getElementById('useremail').style.borderColor = "";
    document.getElementById('first').style.borderColor = "";
    document.getElementById('last').style.borderColor = "";
    document.getElementById('message').style.borderColor = "";
    document.getElementById('subject').style.borderColor = "";


  }
  contactFunction(useremail,subject,first,last,message) {
    this.resetColor();


    this.formdataObj = { "action_type": "contact", "useremail": useremail.value, "first": first.value  , "last": last.value, "subject": subject.value, "message": message.value};



    this.contactActionStart = true;
    this.http.post<responseObject>(this.uri + 'credential.php', this.formdataObj)
      .subscribe(res => {
        this.contactActionStart = false;
        if (res.status == 'ERROR') {
        

          this.errorMessage = res.message;
          if (res.field == 'ALL') {
            document.getElementById('useremail').style.borderColor = "red";
            document.getElementById('first').style.borderColor = "red";
            document.getElementById('last').style.borderColor = "red";
            document.getElementById('message').style.borderColor = "red";
            document.getElementById('subject').style.borderColor = "red";

          }
          if (res.field == 'useremail') {
            document.getElementById('useremail').style.borderColor = "red";

          }
          if (res.field == 'first') {
            document.getElementById('first').style.borderColor = "red";

          }
          if (res.field == 'last') {
            document.getElementById('last').style.borderColor = "red";

          }
          if (res.field == 'message') {
            document.getElementById('message').style.borderColor = "red";

          }
          if (res.field == 'subject') {
            document.getElementById('subject').style.borderColor = "red";

          }

        }  else {
          useremail.value= first.value =last.value= subject.value= message.value='';
          this.successMessage = res.message;

        }


      });
  }

}
