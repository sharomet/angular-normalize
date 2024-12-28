import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {BlogStore} from '../../store/blog/blog.store';
import {responseData} from '../../responseData';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blogStore: BlogStore = inject(BlogStore);
  allPosts = this.blogStore.allPosts();
  items = signal<string[]>(['Элемент 1', 'Элемент 2', 'Элемент 3']);
  items2 = computed(() =>
    this.items().map((item, index) => `${item} (индекс: ${index})`)
  );

  ngOnInit(): void {
    this.blogStore.initialize(responseData);

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
