import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {HttpClient} from '@angular/common/http';
import {WebSocketService} from '../../common/services/web-socket.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  private readonly httpClient: HttpClient = inject(HttpClient);
  readonly webSocketService: WebSocketService = inject(WebSocketService);
  blogStore: BlogStore = inject(BlogStore);
  allPostsSignal = this.blogStore.allPostsComputed();

  ngOnInit(): void {
    this.httpClient.get<any[]>('http://localhost:3000/blog')
      .subscribe((data) => this.blogStore.initialize(data))

    setTimeout(() => {
      this.blogStore.updatePost('0F94E346-01D0-46CD-8A42-37BE4F865394', 'Update Post')
      this.blogStore.updateComment('4F94E346-01D0-46CD-8A42-37BE4F865390', 'Update Comment');
    }, 2000)


    /*const data = this.blogStore.getCommentsForPost('0F94E346-01D0-46CD-8A42-37BE4F865394');
    console.log(data())*/
  }

  sendMessage(): void {
    this.webSocketService.sendMessage('test message');
  }
}
