import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // posts = [
  //   { title: 'First post', content: 'This is the first' },
  //   { title: 'Second post', content: 'This is the second' },
  //   { title: 'Third post', content: 'This is the third' },
  // ];
  @Input()
  posts:Post[]=[];

}
