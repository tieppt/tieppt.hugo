---
id: 299
title: 'Thử Nghiệm Với Angular Phần 11: Template Variable Trong Angular'
date: 2017-02-19T16:39:00+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=299
url: /thu-nghiem-voi-angular-template-variable-trong-angular/
description: 'Bài học này sẽ giới thiệu cho các bạn về cách sử dụng Template Variable trong Angular và ngOnInit, ngAfterViewInit lifecycle.'
images:
  - /assets/uploads/2017/02/angular2-11.jpg
categories:
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular Component
  - Lập Trình Angular 2
  - Web Dev
---
# Template Variable Trong Angular
{:.no_toc}

Bài học này sẽ giới thiệu cho các bạn về cách sử dụng Template Variable trong Angular và ngOnInit, ngAfterViewInit lifecycle.

* ToC
{:toc}
{:.tp__toc}

## Nội dung

Template variable trong Angular có thể tạo bằng cách đặt tên kèm theo dấu # vào trước như sau:

```html
<div class="tp-app__content">
  <input type="text" #nameInput>
  <button (click)="sayHello()">Click me</button>
  <tp-switches #switches></tp-switches>
</div>
```

Ở ví dụ trên, chúng ta đã tạo hai template variables là `nameInput` và `switches`. Chúng ta có thể sử dụng trực tiếp các public properties của chúng như sau:

```ts
nameInput.value

switches.toggle()
```

Hoặc sử dụng ở trong Component:

```ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SwitchesComponent } from "./presentation/switches/switches.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app works!';
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('switches') switches: SwitchesComponent;
  sayHello() {
    this.switches.toggle();
  }
  ngAfterViewInit() {
    this.name.nativeElement.focus();
  }
}
```

Ở ví dụ trên, chúng ta đã tạo ra các properties để trỏ đến các Template variable bằng việc sử dụng <a href="https://angular.io/docs/ts/latest/api/core/index/ViewChild-decorator.html" target="_blank" rel="noopener noreferrer">`@ViewChild`</a>, đối với các element cơ bản của HTML, chúng ta có kiểu dữ liệu tương ứng là <a href="https://angular.io/docs/ts/latest/api/core/index/ElementRef-class.html" target="_blank" rel="noopener noreferrer">`ElementRef`</a>, còn các kiểu như Component, thì chúng ta có thể có cả kiểu `ElementRef` hoặc Component tương ứng.

Chúng ta cũng đã hook vào ngAfterViewInit lifecycle để thực hiện hành động focus `nameInput`.

## Video bài học
  
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/SchaoGakNEg" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Angular lifecycle: <a href="https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html" target="_blank" rel="noopener noreferrer">https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html</a>

Code repo: <a href="https://github.com/tieppt/try-angular/tree/lesson-11" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-11</a>