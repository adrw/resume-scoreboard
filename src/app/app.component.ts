import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// @Pipe({
//   name: 'reverse'
// })
// export class ReversePipe {
//   transform(value) {
//     return value.slice().reverse();
//   }
// }

export class AppComponent {
  title = 'Resume Scoreboard';
  userAuth: any;
  jobTitle="";
  jobDescr="";
  resumeText="";
  views:[
    {
      name: "My Dashboard",
      description: "See your current resumes",
      icon: "folder shared"
    },
    {
      name: "My Dashboard",
      description: "See current resumes",
      icon: "folder shared"
    }
  ];
  resumes: FirebaseListObservable<any[]>;
  resumesDisplay: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) {
    this.af.auth.subscribe(user=>{
      this.userAuth=user;
      console.log(user);
      this.resumes = af.database.list('/users/'+user.uid); //all resumes
      this.resumesDisplay = af.database.list('/users/'+user.uid, {
        query: {
          limitToLast: 10,
          orderByKey: true
        }
      }); //for displaying cards, only shows last 4
    });
  }
  //ng on init, ng on destroy. implement from copnent class, call back to angular 2...
  more() {

  }
  // save(auth: string, name: string) {
  //   this.users.update({ auth: {"name": name} });
  // }
  update() {
    if (
      this.jobTitle != "" && this.jobDescr != "" && this.resumeText != ""
    ) this.resumes.push(
      { "name": this.userAuth.auth.displayName,
        "authId": this.userAuth.auth.uid,
        "timeStamp": Date.now(),
        "jobTitle" : this.jobTitle,
        "jobDescr" : this.jobDescr,
        "resumeText" : this.resumeText,
        "score" : this.jobDescr.length/200
      });



    console.log(
      { "name": this.userAuth.auth.displayName,
        "authId": this.userAuth.auth.uid,
        "jobTitle" : this.jobTitle,
        "jobDescr" : this.jobDescr,
        "resumeText" : this.resumeText,
        "score" : this.jobDescr.length/200 });
    // console.log( { this.userAuth: { "resumes" : { "time" : this.time, "user": this.userAuth.displayName, "jobTitle" : this.jobTitle, "jobDescr": this.jobDescr, "resumeText" : this.resumeText}}});
    // this.users.update( {this.user.auth: { resumes: { time: this.time, user: this.user.displayName, jobTitle:this.jobTitle, jobDescr: this.jobDescr, resumeText:this.resumeText}}});
  }
  delete() {
    this.resumesDisplay.remove();
  }
  onGoogleAuth() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    })

  }

}
