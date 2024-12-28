import {Component, inject, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {responseData} from './responseData';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  private readonly appService: AppService = inject(AppService);

  ngOnInit() {
    this.appService.initialize(responseData);
  }
}
