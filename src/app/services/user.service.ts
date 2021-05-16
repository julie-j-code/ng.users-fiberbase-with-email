import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'users';

  constructor(private afs: AngularFirestore) { }

  createUser(user:User) {
    const  newUser = {
      uid: user.uid,
      // le point d'exclamation indique qu'on est certain qu'il y aura un email
      email: user.email!,
      emailVerified: user.emailVerified,
      createdAt: new Date(),
      // juste pour montrer que dans cette collection on peut ajouter les champs qu'on souhaite
      userSecurityNumber : '2730106027056'
    }

    // on crée une constante qui nous permettra de référencer notre collection utilisateurs
    const usersCollection = this.afs.collection<User>(this.collectionName);
    // on retourne le résultat de l'appel à la méthode add  pour pouvoir ajouter ce nouvelle utilisateur
    // ce que retourne add est une promesse de document référence
    return usersCollection.add(newUser);
  }

  getUsers() {
    return this.afs.collection(this.collectionName).valueChanges({ idField: 'id' }) as unknown as Observable<User[]>;
  }

  getUser(id:string) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges() as Observable<User>;
  }
}


