import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalPost = 0;
  postPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [3, 5, 10];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPost = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onDelete(postId: string | null) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
