import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // mode strict m'emmerde je renonce
  uid:any ;
  user$!:Observable<User> | undefined;

  // ActivatedRoute pour le paramètre de la route
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
        // paramMap retourne un observable auquel il faut s'abonner
    // cet observable nous retournant les paramètres passsés dans l'url
    this.uid = this.activatedRoute.paramMap.subscribe(params => {
      this.uid = params.get('id');
      console.log('this.uid', this.uid);
      this.user$ = this.userService.getUser(this.uid) as Observable<User>
    });
   }

  ngOnInit(): void {

  }

}
