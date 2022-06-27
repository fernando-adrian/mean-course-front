import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string | null;
  private post!: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.postId = '';
  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        const post = this.postsService.getPost(this.postId!);
        this.post = {
          id: post.id!,
          title: post.title!,
          content: post.content!
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm) {
    if (form.invalid) return;

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
