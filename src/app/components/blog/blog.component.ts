import {Component, inject, OnInit} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {responseData} from '../../responseData';
//import {AsyncPipe, KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-blog',
  //imports: [KeyValuePipe, AsyncPipe],
  standalone: true,
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blogStore: BlogStore = inject(BlogStore);

  ngOnInit(): void {
    this.blogStore.initialize(responseData);
    /*const data = this.blogStore.getCommentsByPost('0F94E346-01D0-46CD-8A42-37BE4F865394');
    console.log(data())*/
  }
}
