import { Component } from '@angular/core';
import { TddataService } from './shared/tddata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TddataService]
})
export class AppComponent {
  title = 'todolist';
}
