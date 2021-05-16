import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // on va récupérer un observable de users
  users$: Observable<User[]> | undefined;
  constructor(private afs: UserService) { }

  ngOnInit(): void {
    this.users$ = this.afs.getUsers();
  }

}
