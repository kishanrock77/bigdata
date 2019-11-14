

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { CommonServiceService } from './common-service.service';

interface responseObject {
  status: String, field: string, message: string, workingdata: any
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  workingdata: any;
  uri: string;
  formdataObj: Object = {};
  dashboardActionStart: boolean;
  constructor(private router: Router, private CommonServiceService: CommonServiceService, private http: HttpClient) {
    this.uri = this.CommonServiceService.uri;
    this.successMessage = '';
  }

  ngOnInit() {

    // alert(       localStorage.getItem('unique_id'));
    this.getDashboardData();
  }


  getDashboardData() {


    this.formdataObj = { "action_type": "dashboardData" };

    this.dashboardActionStart = true;
    this.http.post<responseObject>(this.uri + 'dashboarddata.php', this.formdataObj)
      .subscribe(res => {
        this.dashboardActionStart = false;
        if (res.status == 'ERROR') {


          this.errorMessage = res.message;
          if (res.message == 'Session Out') {
            this.router.navigate(["login", {}]);
          }

        } else {

          this.successMessage = res.message;
          this.workingdata = res.workingdata;
//current_plan
          console.log(this.workingdata.current_plan);

        }


      });
  }

}
