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

  registerUser() {
    if(this.password != this.confirmPassword){
      alert("Passwords don't match");
      return;
    }else{
      // console.log('Username:', this.username);
      // console.log('Email:', this.email);
      // console.log('Password:', this.password);
      
      this.registerService.register(this.username, this.password, this.email,)
      .subscribe({
        next: (response) => {
          console.log('User registered:', response);
          //const locationHeader = response.headers.get('Location');
          //console.log('Location of new resource:', locationHeader);
          window.alert('User registration successful');
        },
        error: (error) => {
          console.error('Registration error:', error);
          window.alert('Error during registration');
        }
      });
    }
  }

}
