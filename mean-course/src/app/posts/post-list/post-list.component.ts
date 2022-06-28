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
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: () => console.log('error'),
      complete: () => console.log('complete'),
    });
  }

  onDelete(postId: string | null){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
