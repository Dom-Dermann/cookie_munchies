import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ListComponent) private listComponent: ListComponent;

  onCreateClicked($event) {
    console.log('Parent received event: ', $event);
    this.listComponent.getItems();
  }
}
