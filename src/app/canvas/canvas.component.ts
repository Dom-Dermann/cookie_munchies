import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex: Number;
  active_route;

  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Shopping List', link: 'itemlist', index: 0, icon: 'playlist_add_check'},
      {label: 'Recipes', link: 'recipes', index: 1, icon: 'fastfood'}
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe( (res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find( tab => this.router.url === '/appcanvas/(tab:' + tab.link + ')'));
    });
    this.router.navigateByUrl('/appcanvas/(tab:itemlist)');
  }

  onActivate($event) {
    this.active_route = $event;
    console.log(this.active_route);
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
