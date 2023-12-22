import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../shared/user.service';
import { TokenmgrService } from '../shared/tokenmgr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  username: string = '';
  password: string = '';
  mytoken: string = '';

  constructor(
    private user: UserService, 
    private tokenMgr: TokenmgrService
  ){}

  doLogin(): void {
    this.user.login(this.username, this.password).subscribe(
      response => {
        //console.log("username: "+this.username + " and password:  " +  this.password)
        this.mytoken = response.headers.get("Authorization");
        //console.log(this.mytoken);
        this.tokenMgr.saveToken(this.mytoken);
        this.tokenMgr.saveUsername(this.username);
        window.alert("user login successful, welcome " + this.username);
      },
      error => {
        console.error("Login error:", error);
        window.alert("Error logging in");
      }
    );
  }

}
