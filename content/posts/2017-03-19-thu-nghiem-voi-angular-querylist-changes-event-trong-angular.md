---
id: 350
title: 'Thử Nghiệm Với Angular Phần 14: QueryList Changes Event Trong Angular'
date: 2017-03-19T16:06:57+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=350
url: /thu-nghiem-voi-angular-querylist-changes-event-trong-angular/
description: 'Bài học này sẽ giải quyết vấn đề chúng ta gặp phải khi cần phải hook vào QueryList Changes Event Trong Angular nhằm theo dõi khi nào đối tượng này thay đổi để áp dụng các logic liên quan.'
image: /assets/uploads/2017/03/angular2-14.jpg
categories:
  - Javascript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular 2 Event
  - Angular Component
  - Javascript
  - Lập Trình Angular 2
  - QueryList Changes Event
  - Web Dev
---

# QueryList Changes Event Trong Angular
{:.no_toc}

Trong bài học trước, chúng ta đã &#8220;<a href="/thu-nghiem-voi-angular-thuc-hanh-content-projection-va-lifecycle-angular/" target="_blank" rel="noopener noreferrer">Thực Hành Content Projection Và Lifecycle Liên Quan Trong Angular</a>&#8220;, với phiên bản code đó khi chúng ta làm việc với async như gọi api để lấy dữ liệu rồi in ra thì liệu app của chúng ta có chạy đúng. Bài học này sẽ giải quyết vấn đề chúng ta gặp phải khi cần phải hook vào QueryList Changes Event Trong Angular nhằm theo dõi khi nào đối tượng này thay đổi để áp dụng các logic liên quan.

* ToC
{:toc}
{:.tp__toc}

## Nội dung

Với phiên bản code từ bài học trước liệu rằng khi chúng ta làm việc với dữ liệu async thì app của chúng ta sẽ chạy đúng. Lúc này, chúng ta gặp phải một vấn đề đó là mặc dù chúng ta đã để `[multiple]="false"` nhưng app lại chạy không như chúng ta mong muốn.

{% raw %}
```html
<tp-collapse-group [multiple]="false">
  <tp-collapse
    *ngFor="let post of posts" [title]="post.title" [selected]="false">
    <div>
      {{ post.body }}
    </div>
  </tp-collapse>
</tp-collapse-group>
```
{% endraw %}

```ts
import { Component, OnInit } from '@angular/core';
import { POSTS } from './services/post';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  ngOnInit() {
    setTimeout(() => {
      this.posts = POSTS.slice();
    }, 500);
  }
}
```

Bây giờ, chúng ta cần quan sát đối tượng của QueryList thay đổi như thế nào để có các hành động tương ứng bằng việc subscribe vào Changes Event của đối tượng đó như sau:

```ts
this.collapses.changes.subscribe((object) => {
  // do something here
});
```

Ví dụ như trong app của chúng ta đang phát triển, chúng ta cần quan sát sự thay đổi của list CollapseComponent để thực hiện quản lý ở mode accordion như sau:

```ts
this.collapses.changes.subscribe(() => {
  this.clearListener();
  this.initListener();
});
```

Việc quan sát này thực sự cẩn thiết khi chúng ta cần phải áp dụng một phần logic nào đó để Component của chúng ta chạy đúng, chẳng hạn như mong muốn của chúng ta là CollapseGroupComponent chỉ thực hiện cho phép một CollapseComponent được phép mở ở tại một thời điểm nếu chúng ta set cho mode của group là accordion.

Thêm vào đó, khi thực hiện subscribe bằng code như trên, chúng ta đã tạo ra một object của class Subscription, vậy nên khi Component bị destroy thì chúng ta nên (phải) hủy object đó đi như sau:

```ts
// some method
this._changeSubs = this.collapses.changes.subscribe(() => {
  this.clearListener();
  this.initListener();
});

// on destroy
ngOnDestroy() {
  if (this._changeSubs) {
    this._changeSubs.unsubscribe();
  }
}
```

Đơn giản phải không nào!

Và code hoàn thiện của **CollapseGroupComponent** như sau:

```ts
import { Component, OnInit, AfterContentInit, Input, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { CollapseComponent } from "../collapse/collapse.component";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'tp-collapse-group',
  templateUrl: './collapse-group.component.html',
  styleUrls: ['./collapse-group.component.scss']
})
export class CollapseGroupComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren(CollapseComponent) collapses: QueryList<CollapseComponent>;
  @Input() multiple: boolean = true;

  private _subscriptions: Subscription[] = [];
  private _changeSubs: Subscription;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.initListener();
    this._changeSubs = this.collapses.changes.subscribe(() => {
      this.clearListener();
      this.initListener();
    });
  }

  initListener() {
    this.collapses.forEach(collapse => {
      let subscription = collapse.selectedChange.subscribe(coll => {
        if (!this.multiple && coll.selected) {
          this.toggleCollapse(coll);
        }
      });
      this._subscriptions.push(subscription);
    });
  }

  toggleCollapse(collapse) {
    this.collapses.forEach(c => {
      if (c.collapseId != collapse.collapseId) {
        c.selected = false;
      }
    });
  }

  clearListener() {
    if (this._subscriptions && this._subscriptions.length) {
      this._subscriptions.forEach(sub => sub.unsubscribe());
    }
    this._subscriptions = [];
  }

  ngOnDestroy() {
    this.clearListener();
    if (this._changeSubs) {
      this._changeSubs.unsubscribe();
    }
  }

}
```

## Video bài học:

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/OcmrLU_0thc" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Source code: <a href="https://github.com/tieppt/try-angular/tree/lesson-14" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-14</a>