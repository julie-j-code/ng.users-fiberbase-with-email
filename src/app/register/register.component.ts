import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm:FormGroup;
  result:any;
  message:any;
  user:any;

  constructor(private fb: FormBuilder, private afAuth : AngularFireAuth, private userService:UserService) {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() : void {
  }

  // puisqu'on attend le retour de l'authentification
  // on gère de l'async
  async register() {
    if (!this.registerForm.valid) {
      console.log('grrr');
      return;
    }
    try {
      this.message = '';
      const { email, password} = this.registerForm.value;
      this.result = await this.afAuth.createUserWithEmailAndPassword(email, password)

      // this.result = await this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password);
      this.registerForm.reset();
      if(this.result && this.result.user){
        const userCreated = this.userService.createUser(this.result.user);
        console.log('userCreated', userCreated);
        this.result=null;
      }
    } catch (error) {
      console.error(error);
      if(error.message === 'The email address is already in use by another account.') {
        this.message = 'email déjà pris';
      }

    }
  }

  async login() {
    if (!this.loginForm.valid) {
      console.log(':(');
      return;
    }
    try {
      this.message = '';
      console.log('login', this.loginForm.value);
      const { email, password} = this.loginForm.value;
      this.user = await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.message = error.message;
    }
  }



}
