import { Component, ViewChild, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(ListComponent) private listComponent: ListComponent;

  routeLinks: any[];
  activeLinkIndex: Number;
  active_route;

  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Shopping List', link: './itemlist', index: 0, icon: 'playlist_add_check'},
      {label: 'Recipes', link: './recipes', index: 1, icon: 'fastfood'}
    ];
  }

  onActivate($event){
    this.active_route = $event;
    console.log(this.active_route);
  }

  ngOnInit(): void{
    this.router.events.subscribe( (res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find( tab => tab.link === '.' + this.router.url));
    })
  }

  onCreateClicked($event) {
    console.log('Parent received event: ', $event);
    this.active_route.getItems();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
