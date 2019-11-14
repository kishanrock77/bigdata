 
import { Component } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileService } from './file.service';
 
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { reduce } from 'rxjs-compat/operator/reduce';
import { CommonServiceService }     from './common-service.service';

interface responseObject {
    status: String, field: string, fileid: string, message: string, maxDays: number, link: string
}
interface maxsizeresponseObject {
    maxSize: number, maxSizeInGB: string
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [FileService]
})
export class HomeComponent {
    uri: string;
    uploader: FileUploader = new FileUploader({ url: this.uri + 'api.php' });
    errorMessage: string;
    successMessage: string;
    fileid: string;
    maxSize: number; maxSizeInGB: string;
    maxDays: number;
    attachmentList: any = [];
    totSize: number = 0;
    formdataObj: Object = {};
    useremail: string;
    action_type: string;
    targetemail: string;
    generatedlink: string;
    subject: string;
    message: string;
    emailActionStart: boolean;
    generatelinkActionStart: boolean;
    emailSuccessPortion: boolean;
    generatelinkSuccessPortion: boolean;
    constructor(private CommonServiceService: CommonServiceService,private _fileService: FileService, private http: HttpClient) {
        this.uri = this.CommonServiceService.uri;
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log(status);

            this.attachmentList.push(JSON.parse(response));

        }
        this.uploader.onCompleteAll = () =>{
            console.log("here i am");
             
            if (this.action_type == 'EMAIL') {
                this.emailSuccessPortion = true;this.emailActionStart = false;
            }
            if (this.action_type == 'LINK') {
                this.generatelinkSuccessPortion = true;  this.generatelinkActionStart = false; 
            }
            this.uploader.clearQueue();
        }
        this.action_type = 'EMAIL';
        this.emailActionStart = false;
        this.generatelinkActionStart = false;


        this.getMaxSize();
    }

    clearQue(){
        this.uploader.clearQueue();
    }
    getMaxSize() {


        this.formdataObj = { "maxSize": 0, "action_type": "GETMAXSIZE" };




        this.http.post<maxsizeresponseObject>(this.uri + 'check_user_data_validation.php', this.formdataObj)
            .subscribe(res => {

                this.maxSize = res.maxSize;
                this.maxSizeInGB = res.maxSizeInGB;




            });
    }
    resetAnother() {
        this.fileid = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.generatedlink = '';
        this.emailActionStart = false;
        this.generatelinkActionStart = false;
        this.emailSuccessPortion = false;
        this.generatelinkSuccessPortion = false;

    }
    resetColor() {

        document.getElementById('useremail').style.borderColor = "";
        document.getElementById('targetemail').style.borderColor = "";
        document.getElementById('subject').style.borderColor = "";
        document.getElementById('message').style.borderColor = "";
    }

    check(useremail, targetemail, subject, message) {
        this.resetColor();
        this.resetAnother();
        this.totSize = 0;

        this.formdataObj = { "maxSize": this.maxSize, "action_type": "EMAIL", "useremail": useremail.value, "targetemail": targetemail.value, "subject": subject.value, "message": message.value };


        for (var t = 0; t < this.uploader.queue.length; t++) {
            var sizeOfFile: number = this.uploader.queue[t].file.size;

            this.totSize = this.totSize + sizeOfFile;
        }
        if (this.totSize > this.maxSize) {
            this.errorMessage = "You are trying to upload more than " + this.maxSizeInGB + " (" + this.totSize / 1000000000 + "GB). Use subscription plan to upload more than " + this.maxSizeInGB + "  !!";
            return false;
        }
        this.emailActionStart = true;
        this.http.post<responseObject>(this.uri + 'check_user_data_validation.php', this.formdataObj)
            .subscribe(res => {
               
                if (res.status == 'ERROR') {
                    this.emailActionStart = false;
                   
                    this.errorMessage = res.message;
                    if (res.field == 'ALL') {
                        document.getElementById('useremail').style.borderColor = "red";
                        document.getElementById('targetemail').style.borderColor = "red";
                        document.getElementById('subject').style.borderColor = "red";
                        document.getElementById('message').style.borderColor = "red";
                    }
                    if (res.field == 'useremail') {
                        document.getElementById('useremail').style.borderColor = "red";

                    }
                    if (res.field == 'targetemail') {
                        document.getElementById('targetemail').style.borderColor = "red";

                    }
                    if (res.field == 'subject') {
                        document.getElementById('subject').style.borderColor = "red";

                    }
                    if (res.field == 'message') {
                        document.getElementById('message').style.borderColor = "red";

                    }
                } else {
                    this.emailSuccessPortion = true;
                    this.fileid = res.fileid;
                    this.maxDays = res.maxDays;
                    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
                        form.append('fileid', this.fileid);

                    };
                    this.uploader.uploadAll();
                }


            });
    }
    checkForgenerateLink() {
        this.resetAnother();
        this.totSize = 0;

        this.formdataObj = { "maxSize": this.maxSize, "action_type": "LINK" };


        for (var t = 0; t < this.uploader.queue.length; t++) {
            var sizeOfFile: number = this.uploader.queue[t].file.size;

            this.totSize = this.totSize + sizeOfFile;
        }
        if (this.totSize > this.maxSize) {
            this.errorMessage = "You are trying to upload more than " + this.maxSizeInGB + " (" + this.totSize / 1000000000 + "GB). Use subscription plan to upload more than " + this.maxSizeInGB + "  !!";
            return false;
        }
        this.generatelinkActionStart = true;
        this.http.post<responseObject>(this.uri + 'check_user_data_validation.php', this.formdataObj)
            .subscribe(res => {
              
                if (res.status == 'ERROR') {
                    this.errorMessage = res.message;
                    this.generatelinkActionStart = false;
                } else {

                    this.maxDays = res.maxDays;
                    this.generatedlink = res.link;
                    this.fileid = res.fileid;
                    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
                        form.append('fileid', this.fileid);

                    };
                    this.uploader.uploadAll();
                }


            });
    }
    BackToGenerateAnotherLink() {

        this.resetAnother();
    }

    BackToSendAnotherEmail(useremail,targetemail,subject,message) {
        useremail.value='';targetemail.value='';subject.value='';message.value='';
        this.resetAnother();
    }
    download(index) {
        var filename = this.attachmentList[index].uploadname;

        this._fileService.downloadFile(filename)
            .subscribe(
                data => saveAs(data, filename),
                error => console.error(error)
            );
    }
}