import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainServiceService} from "../main-service.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  constructor(public router: Router,private route : ActivatedRoute,private service: MainServiceService) {
  }
  person;
  isMain = false;
  isFriends = false;
  isNews = false;
  isSettings = false;
  isMessages = false;
  isStorage = false;
  ngOnInit():void {
    this.route.params.subscribe(params =>{
      this.person = this.service.getPerson(params['Nickname']);
    });
    if(this.person !=null) {
      if (this.router.url === '/timeTO/' + this.person.Nickname) {
        this.isMain = true;
      }
      if (this.router.url === '/friends/' + this.person.Nickname) {
        this.isFriends = true;
      }
      if (this.router.url === '/messages/' + this.person.Nickname) {
        this.isMessages = true;
      }
    }
    else{
      if (this.router.url === '/settings') {
        this.isSettings = true;
      }
      if (this.router.url === '/news') {
        this.isNews = true;
      }
      if (this.router.url === '/messages') {
        this.isMessages = true;
      }
      if (this.router.url === '/storage') {
        this.isStorage = true;
      }
    }
  }


}
