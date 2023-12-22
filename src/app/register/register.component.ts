import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms'; 



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent { 
  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private registerService: UserService) { }

  onUsernameBlur() {
    if (this.username) {
      this.registerService.checkDupe(this.username)
        .subscribe({
          next: (response) => {
            if(response.status == 200){
              alert('Username is already taken');
            }
          },
        });
    }
  }

  registerUser() {
    if(this.password != this.confirmPassword){
      alert("Passwords don't match");
      return;
    }
    else{      
      this.registerService.register(this.username, this.password, this.email,)
      .subscribe({
        next: (response) => {
          console.log('User registered:', response);
          window.alert('User registration successful');
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    }
  }

}
