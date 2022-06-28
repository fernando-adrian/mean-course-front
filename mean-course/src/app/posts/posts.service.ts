import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transPostData) => {
        this.posts = transPostData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((respData) => {
        post.id = respData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string | null) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
