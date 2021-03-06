import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  list;
  ngOnInit() {
    function compare(a1, a2) {
      function eq(a1, a2){
        if(a1.likes==null&&a2.likes==null)
          return (a1.id==a2.id&&a1.text==a2.text);
        if(a1.likes!=null&&a2.likes!=null&&a2.likes.length==a1.likes.length)
          return(a1.id==a2.id&&a1.likes.every((v,i)=>v==a2.likes[i])&&a1.text==a2.text);
        return false;
      }
      return a1.length == a2.length && a1.every((v,i)=>eq(v,a2[i]));
    }
    setInterval(()=>{
      let newList = this.service.getNews();
      newList.sort(this.compare);
      if(this.list==null||newList==null||!compare(newList,this.list)) {
        this.list = newList;
      }
      if(this.list!=null) {
        this.list.sort(this.compare);
      }
    },100);
  }
  compare(posts2,posts1){
    return Date.parse(posts1.time) - Date.parse(posts2.time);
  }
}
