import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserViewModel } from '../../core/viewModel/UserViewModel';


@Component({
  selector: 'app-login',
  templateUrl: './LoginComponent.html',
  styleUrls: ['./LoginComponent.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private userViewModel: UserViewModel, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.userViewModel.doLogin(this.loginForm.value);
  }
}