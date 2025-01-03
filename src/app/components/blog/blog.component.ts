import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {HttpClient} from '@angular/common/http';
import {WebSocketService} from '../../common/services/web-socket.service';
import {IBlog, ICommentModel} from '../../store/blog/blog';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  private readonly httpClient: HttpClient = inject(HttpClient);
  readonly webSocketService: WebSocketService = inject(WebSocketService);
  blogStore: BlogStore = inject(BlogStore);
  postsSignal = this.blogStore.getDenormalizeDataComputed;
  formGroup: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    effect(() => {
      if (!this.webSocketService.messageSignal()) {
        return;
      }
      this.blogStore.initialize(this.webSocketService.messageSignal());
    });

    this.formGroup = this.formBuilder.group({
      posts: this.formBuilder.array([])
    });
    setTimeout(() => {
    this.formGroup = this.formBuilder.group({
      posts: this.formBuilder.array(this.postsSignal().map(post => this.postFormGroup(post)))
    })
    }, 2000)
  }

  ngOnInit(): void {
    this.httpClient.get<IBlog[]>('http://localhost:3000/blog')
      .subscribe((data) => this.blogStore.initialize(data))
  }

  postFormGroup(post: IBlog) {
    return this.formBuilder.group({
      body: [post.body, Validators.required],
      comments: this.formBuilder.array(
        post.comments.map(comment => this.commentFormGroup(comment)) || []
      ),
    });
  }

  commentFormGroup(comment: ICommentModel) {
    return this.formBuilder.group({
      comment: [comment.comment, Validators.required],
    });
  }

  get postsArray(): FormArray {
    return this.formGroup.get('posts') as FormArray;
  }

  getCommentsArray(index: number): FormArray {
    return this.postsArray.at(index).get('comments') as FormArray;
  }

  submitForm() {
    console.log('test', this.formGroup)
  }

  sendMessage(): void {
    const data = [
      {
        id: "0F94E346-01D0-46CD-8A42-37BE4F865394",
        author: {
          id: "0F04E340-01D0-46CD-8A42-37BE4F865390",
          name: "Author Websocket 1"
        },
        body: "Websocket Post 1 content update",
        comments: [
          {
            id: "4F94E346-01D0-46CD-8A42-37BE4F865390",
            author: {
              id: "0F04E346-01D0-46CD-8A42-37BE4F865390",
              name: "User 2"
            },
            comment: "Post 1 Comment 1"
          },
          {
            id: "4F94E346-01D0-46CD-8A42-37BE4F865391",
            author: {
              id: "0F14E346-01D0-46CD-8A42-37BE4F865390",
              name: "User 2"
            },
            comment: "Post 1 Comment 2"
          }
        ]
      },
      {
        id: "1F94E346-01D0-46CD-8A42-37BE4F865394",
        author: {
          id: "0F04E341-01D0-46CD-8A42-37BE4F865390",
          name: "Aaaa asdasdasd User 2"
        },
        body: "Post 2 content",
        comments: [
          {
            id: "4F94E346-01D0-46CD-8A42-37BE4F865392",
            author: {
              id: "0F24E346-01D0-46CD-8A42-37BE4F865390",
              name: "User 2"
            },
            comment: "Post 2 Comment 1"
          },
          {
            id: "4F94E346-01D0-46CD-8A42-37BE4F865393",
            author: {
              id: "0F34E346-01D0-46CD-8A42-37BE4F865390",
              name: "User 2"
            },
            comment: "Post 2 Comment 2"
          },
          {
            id: "4F94E346-01D0-46CD-8A42-37BE4F865394",
            author: {
              id: "0F44E346-01D0-46CD-8A42-37BE4F865390",
              name: "User 2"
            },
            comment: "Post 2 Comment 3"
          }
        ]
      }
    ];
    this.webSocketService.sendMessage(JSON.stringify(data));
  }
}
