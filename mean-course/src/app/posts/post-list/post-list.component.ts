import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  // posts = [
  //   { title: 'First post', content: 'This is the first' },
  //   { title: 'Second post', content: 'This is the second' },
  //   { title: 'Third post', content: 'This is the third' },
  // ];
  posts: Post[] = [];
  private postsSub: Subscription = Subscription.EMPTY;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe({
      next: (posts: Post[]) => (this.posts = posts),
      error: () => console.log('error'),
      complete: () => console.log('complete'),
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
