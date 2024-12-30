import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  httpClient: HttpClient = inject(HttpClient);
  blogStore: BlogStore = inject(BlogStore);

  ngOnInit(): void {
    this.httpClient.get<any[]>('http://localhost:3000/blog')
      .subscribe((data) => this.blogStore.initialize(data))

    /*setTimeout(() => {
      this.blogStore.updatePost('0F94E346-01D0-46CD-8A42-37BE4F865394', 'Update Post')
    }, 3000)*/

    /*const posts = this.blogStore.allPosts();
    posts().forEach((post) => {
      console.log(post)
    })*/
    /*const data = this.blogStore.getCommentsForPost('0F94E346-01D0-46CD-8A42-37BE4F865394');
    console.log(data())*/
  }
}
