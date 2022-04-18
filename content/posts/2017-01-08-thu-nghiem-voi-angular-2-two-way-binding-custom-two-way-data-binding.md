---
id: 273
title: 'Thử Nghiệm Với Angular 2 Phần 9: Angular 2 Two-way Binding Và Tạo Custom Two-way Data Binding'
date: 2017-01-08T12:19:29+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=273
url: /thu-nghiem-voi-angular-2-two-way-binding-custom-two-way-data-binding/
description: 'Bài học này chúng ta sẽ cùng tìm hiểu về Two-way Binding và cách tạo Custom Two-way Data Binding trong Angular 2.'
images:
  - /assets/uploads/2017/01/angular-2-Two-way-Binding-Va-Tao-Custom-Two-way-Data-Binding.jpg
categories:
  - Javascript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular 2 Directives
  - Angular 2 Event
  - Angular 2 Two-way Binding
  - Angular @Input
  - Angular @Output
  - Angular Component
  - Custom Two-way Data Binding
  - Lập Trình Angular 2
  - Web Dev
---

# Angular 2 Two-way Binding Và Tạo Custom Two-way Data Binding
{:.no_toc}

Angular 2 Component có thể <a href="/thu-nghiem-voi-angular-2-truyen-du-lieu-cho-component-voi-input/" target="_blank" rel="noopener noreferrer">truyền vào data với `@Input`</a> hoặc <a href="/thu-nghiem-voi-angular-2-component-event-voi-eventemitter-output/" target="_blank" rel="noopener noreferrer">gửi event ra ngoài với `@Output`</a>, chúng đều là **unidirectional data flow** hay one-way binding. Angular 2 Two-way Binding không là built-in trong Angular 2. Tuy vậy chúng ta vẫn có thể áp dụng Two-way Binding bằng cách sử dụng directive `ngModel` trong Angular 2. Bài học này chúng ta sẽ cùng tìm hiểu về Two-way Binding và cách tạo Custom Two-way Data Binding trong Angular 2.

* ToC
{:toc}
{:.tp__toc}

## Giới thiệu về Angular 2 Two-way Binding với `ngModel`

Angular 2 có một directive để áp dụng two-way binding đó là `ngModel`. Chúng ta có thể bao ngModel trong cặp dấu `[()]`, nó sẽ thực hiện đồng bộ dữ liệu từ Component vs DOM và ngược lại.

**app.component.html**
```html
<div>
  <input type="text" 
    (keyup.enter)="updateMesssages()" 
    [(ngModel)]="message"
  >
  <button (click)="updateMesssages()">Button...</button>
</div>
```

**app.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: string[] = [];
  message: string = '';
  updateMesssages() {
    this.messages.push(this.message);
    this.message = '';
  }
}
```

Nếu không sử dụng `[(ngModel)]` chúng ta có thể hoàn toàn viết một cú pháp tương ứng cho ví dụ trên như sau:

**app.component.html**
```html
<div>
  <input type="text" 
    (keyup.enter)="updateMesssages()" 
    [value]="message" 
    (input)="message = $event.target.value"
  >
  <button (click)="updateMesssages()">Button...</button>
</div>
```

Khi không sử dụng directive `ngModel` ở cấu trúc binding bởi cặp dấu `[()]`, chúng ta hoàn toàn có thể tách thành 2 cấu trúc binding riêng biệt là event binding và property binding:

**app.component.html**
```html
<div>
  <input type="text" 
    (keyup.enter)="updateMesssages()" 
    [ngModel]="message" 
    (ngModelChange)="message = $event">
  <button (click)="updateMesssages()">Button...</button>
</div
```

Như các bạn có thể thấy,  directive `ngModel` ở ví dụ minh họa trên bao gồm property `ngModel` và event `ngModelChange`.

## Tạo Custom Two-way Data Binding

Để tạo được Custom Two-way Data Binding, chúng ta kết hợp `@Input` (property binding) và `@Output` (event binding) với cú pháp:

Tên của input là `xyz` thì tên của output là `xyzChange`.

**switches.component.ts**
```ts
import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'tp-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss']
})
export class SwitchesComponent implements OnInit {
  @Input() checked: Boolean = false;                              // input
  @Output('checkedChange') change = new EventEmitter<boolean>();  // output

  constructor() { }

  ngOnInit() {
  }
  emitChangeValue(event) {
    this.change.emit(event.target.checked);
  }
}
```

Sử dụng trong một component khác:

**contact-list.component.html**
```html
<div>
  <tp-switches [(checked)]="contact.avatar.round">
  </tp-switches>
  <tp-contact-image-detail
    [avatar-url]="contact.avatar?.url"
    [round]="contact.avatar?.round"
  >
  </tp-contact-image-detail>
</div>
```

> Lưu ý: two-way binding không dùng kết hợp với dạng check null như `contact.avatar?.round` .


## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/pFYaN23PG8M" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Documentation: <a href="https://angular.io/docs/ts/latest/guide/architecture.html#!#data-binding" target="_blank" rel="noopener noreferrer"> https://angular.io/docs/ts/latest/guide/architecture.html#!#data-binding</a>

Code demo: <a href="https://github.com/tieppt/try-angular/tree/lesson-9" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-9</a>