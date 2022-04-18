---
id: 323
title: 'Thử Nghiệm Với Angular Phần 12: Content Projection Trong Angular'
date: 2017-03-04T13:50:01+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=323
url: /thu-nghiem-voi-angular-content-projection-trong-angular/
description: 'Làm thế nào để sử dụng lại các component trong Angular 2+, hay làm sao để có thể nhúng content của một component cho một component khác. Content Projection trong Angular sẽ giải quyết bài toán này.'
image: /assets/uploads/2017/03/angular2-12.jpg
categories:
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular Component
  - Content Projection
  - Lập Trình Angular 2
  - Web Dev
---

# Content Projection Trong Angular
{:.no_toc}

Làm thế nào để sử dụng lại các component trong Angular 2+, hay làm sao để có thể nhúng content của một component cho một component khác. Bài học này sẽ giới thiệu cho các bạn về Content Projection trong Angular sử dụng `ng-content` directive.

* ToC
{:toc}
{:.tp__toc}

## 1. Nhúng một phần content vào một component

### 1.1 `ng-content` directive:

Chúng ta sẽ nhúng ng-content directive vào phần component template mà chúng ta mong muốn content sẽ được nhúng vào.

**card.component.html**

```html
<div class="tp-card">
  <ng-content></ng-content>
</div>
```

**card.component.ts**

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent { }
```

Khi ở trong Component khác mà chúng ta muốn nhúng template vào phần đã định nghĩa của Component cho phép nhúng thì chúng ta có thể làm như sau.

**app.component.html**
```html
<tp-card>
  <header class="tp-card__title">Title</header>
  <div class="tp-card__content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestiae.
  </div>
  <footer class="tp-card__footer"> 
    <button class="tp-button btn btn-danger">Action</button> 
  </footer>
</tp-card>
```

### 1.2 Sử dụng `selector`:

> Khi bạn sử dụng **`selector`**, tất cả các `selector` nào thỏa mãn sẽ được nhúng vào đúng vị trí đã chọn, dù có nhúng vào **_nhiều hơn một lần_**.

&#8211; Tag selector:

**card.component.html**

```html
div class="tp-card">
  <ng-content select="header"></ng-content>
</div>
```

&#8211; Class selector:

**card.component.html**

```html
<div class="tp-card">
  <ng-content select=".tp-card__content"></ng-content>
</div>
```

&#8211; Attribute selector:

**card.component.html**

```html
<div class="tp-card">
  <ng-content select="[data-footer=cool-footer]"></ng-content>
</div>
```

&#8211; Sử dụng nhiều selector:

**card.component.html**

```html
<div class="tp-card">
  <ng-content select="footer[data-footer=cool-footer]"></ng-content>
</div>
```

Template từ Component muốn nhúng vào.

**app.component.html**

```html
<tp-card>
  <header class="tp-card__title">Title</header>
  <div class="tp-card__content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestiae.
  </div>
  <footer class="tp-card__footer" data-footer="cool-footer"> 
    <button class="tp-button btn btn-danger">Action</button> 
  </footer>
</tp-card>
```

## 2. Nhúng nhiều phần content vào một component

Việc nhúng nhiều phần content hoàn toàn được phép, bạn có thể nhúng nhiều phần khác nhau ví dụ như:

**card.component.html**

```html
<div class="tp-card">
 <ng-content select="header"></ng-content>
 <ng-content select=".tp-card__content"></ng-content>
 <ng-content select="footer"></ng-content>
</div>
```

> Lưu ý: thứ tự đặt của `ng-content` sẽ có tác động đến thứ tự truyền vào từ Component khác, nếu Component khác truyền Template vào với thứ tự khác, thì thứ tự hiển thị sẽ **_tuân theo thứ tự của Component khai báo ng-content_**.

Ví dụ như bạn nhúng content như sau:

**app.component.html**
```html
<tp-card>
  <header class="tp-card__title">Title</header>
  <footer class="tp-card__footer" data-footer="cool-footer"> 
    <button class="tp-button btn btn-danger">Action</button> 
  </footer>
  <div class="tp-card__content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestiae.
  </div>
</tp-card>
```

## 3. Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/AeniQWsk85k" frameborder="0" allowfullscreen="true"> </iframe>
</figure>


## 4. Tham khảo

Code repo: <a href="https://github.com/tieppt/try-angular/tree/lesson-12" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-12</a>
