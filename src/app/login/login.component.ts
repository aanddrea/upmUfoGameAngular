import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: `./login.component.html`,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  doLogin(): void {
    if (this.username && this.password) {
      const url = 'http://wd.etsisi.upm.es:10000/users/login';
      const body = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      this.http.post(url, body, { headers, observe: 'response' }).subscribe(
        (response) => {
          const authToken = response.headers.get('Authorization');
          if (authToken?.startsWith('Bearer ')) {
            localStorage.setItem('token', authToken.substring(7)); 
            alert('Login successful. Token stored.');
          } else {
            alert('Login failed: Invalid token.');
          }
        },
        (error) => {
          alert('Login error: ' + error.message);
        }
      );
    } else {
      alert('Please enter both username and password.');
    }
  }
}
