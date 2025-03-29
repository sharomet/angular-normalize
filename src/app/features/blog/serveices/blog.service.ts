import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TPost } from '../types/blog.type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    fetchBlogData(): Observable<TPost[]> {
        return this.httpClient.get<TPost[]>('http://localhost:3000/blog')
    }
}
