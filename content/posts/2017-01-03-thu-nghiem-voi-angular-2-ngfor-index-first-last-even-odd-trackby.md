---
id: 242
title: 'Thử Nghiệm Với Angular 2 Phần 5: NgFor Và Các Thuộc Tính Index, First, Last, Even, Odd, TrackBy'
date: 2017-01-03T16:27:03+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=242
url: /thu-nghiem-voi-angular-2-ngfor-index-first-last-even-odd-trackby/
description: 'Trong bài học này chúng ta sẽ tìm hiểu một số thuộc tính mà Angular 2 NgFor cung cấp như các biến cục bộ: index, first, last, even, odd hay việc tối ưu performance với trackBy function.'
image: /assets/uploads/2017/01/angular2-PHAN5.jpg
categories:
  - Javascript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2 Directives
  - Angular Component
  - Lập Trình Angular 2
  - NgFor
  - Web Dev
---

# NgFor Và Các Thuộc Tính Index, First, Last, Even, Odd, TrackBy
{:.no_toc}

Trong bài học số 2, chúng ta đã tìm hiểu về một số <a href="/thu-nghiem-voi-angular-2-built-in-directives-ngif-ngfor-ngswitchcase/" target="_blank">Structual Directives</a> trong đó có NgFor. Trong bài học này chúng ta sẽ tìm hiểu một số thuộc tính mà Angular 2 NgFor cung cấp như các biến cục bộ: `index`, `first`, `last`, `even`, `odd` hay việc tối ưu performance với `trackBy` function.

* ToC
{:toc}
{:.tp__toc}

## Giới thiệu

NgFor cung cấp các biến cục bộ, có thể tạo một alias cho các biến đó như:

  * `index` xác định chỉ số hiện tại của vòng lặp tương ứng.
  * `first` xác định vòng lặp hiện tại có phải là vòng lặp đầu tiên không -> true : false.
  * `last` xác định vòng lặp hiện tại có phải là vòng lặp cuối cùng không -> true : false.
  * `even` xác định vòng lặp hiện tại có phải là vòng lặp có chỉ số chẵn không -> true : false.
  * `odd` xác định vòng lặp hiện tại có phải là vòng lặp có chỉ số lẻ không -> true : false.

NgFor trackBy function:

Angular 2 NgFor khi thực hiện lặp qua một collection sẽ có thể tạo một template cho mỗi item (**thao tác với các immutable object**). Khi thực hiện thêm hoặc xóa item trong collection, nó sẽ tạo lại template vì nó không track được các item đó. Lúc này để cái thiện performance chúng ta có thể định nghĩa một phương thức để giúp Angular track được các items đó, đó là lý do ra đời của `trackBy` function.

Cú pháp:

```html
<li *ngFor="let item of items; let i = index; trackBy: trackByFn">
  // do something
</li>
<li template="ngFor let item of items; let i = index; trackBy: trackByFn">
  // do something
</li>
```

Sử dụng với cú pháp thẻ `template` (sẽ có bài giới thiệu sau):

```html
<template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</template>
```

## Update từ Angular 4+

Cho phép sử dụng `as`:

```html
<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
<li template="ngFor let item of items; index as i; trackBy: trackByFn">...</li>
```

Thay `template` bằng `ng-template`:

```html
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</ng-template>
```

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/5df6zJhycGs" frameborder="0" allowfullscreen="true"> </iframe>
</figure>


## Tham khảo

Tìm hiểu thêm tại Angular NgFor Directive:

<a href="https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html" target="_blank">https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html</a>

<a href="https://angular.io/docs/ts/latest/api/common/index/NgForOf-directive.html" target="_blank">https://angular.io/docs/ts/latest/api/common/index/NgForOf-directive.html</a>