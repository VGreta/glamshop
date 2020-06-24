import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-a-user',
  templateUrl: './a-user.component.html',
  styleUrls: ['./a-user.component.css']
})
export class AUserComponent implements OnInit {
  users: User[];

  constructor(
    private uS: UserService
  ) { }

  ngOnInit() {
    this.uS.getUsers().subscribe(data => {
      this.users = data.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as User
        }
      })
    })
  }


}
