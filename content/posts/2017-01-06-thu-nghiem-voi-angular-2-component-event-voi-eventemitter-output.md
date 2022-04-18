---
id: 268
title: 'Thử Nghiệm Với Angular 2 Phần 8: Component Event Với EventEmitter Và @Output'
date: 2017-01-06T16:53:27+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=268
url: /thu-nghiem-voi-angular-2-component-event-voi-eventemitter-output/
description: 'Bài học sẽ giới thiệu cách để Component phát sinh Event để tương tác từ Component con với Component cha.'
images:
  - /assets/uploads/2017/01/angular2-PHAN8-Componen-Event-Voi-EventEmitter-Va-Output.jpg
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
  - Angular @Output
  - Angular Component
  - Lập Trình Angular 2
  - Web Dev
---

# Component Event Với EventEmitter Và `@Output`
{:.no_toc}

Sau khi tìm hiểu bài học <a href="/thu-nghiem-voi-angular-2-truyen-du-lieu-cho-component-voi-input/" target="_blank" rel="noopener noreferrer">Truyền Dữ Liệu Cho Component Với `@Input`</a> trong series **Thử Nghiệm Với Angular 2**, chúng ta đã biết cách để Component có thể nhận dữ liệu đầu vào. Bài học &#8220;Component Event Với `EventEmitter` Và `@Output`&#8221; sẽ giới thiệu cách để Component phát sinh Event để tương tác từ Component con với Component cha.

* ToC
{:toc}
{:.tp__toc}

## `@Output` sử dụng như thế nào?

Tương tự như `@Input`, việc sử dụng `@Output` cũng rất dễ dàng.

Bạn cần đặt một tên cho event hoặc có thể thêm alias, sau đó gán nó với `@Output` decorator và một phép gán cho một đối tượng thuộc `EventEmitter` như sau:

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
  @Input() checked: Boolean = false;
  @Output('checkedChange') change = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
}
```

Khi có một hành động nào đó xảy ra, bạn sẽ kích hoạt event đó và trả về kèm theo một giá trị có thể là kiểu primitive hoặc các kiểu phức hợp như object, array, &#8230;

```ts
...

export class SwitchesComponent implements OnInit {
  ...
  emitChangeValue(event) {
    this.change.emit(event.target.checked);
  }
}
```

**switches.component.html**
```html
<label class="tp-toggle tp-toggle--round tp-toggle--flat">
  <input type="checkbox"
    class="tp-toggle__checkbox"
    [checked]="checked"
    (change)="emitChangeValue($event)"/>
  <span class="tp-toggle__icon"></span>
</label>
```

## Listener event ở Component cha như thế nào?

Ở Component cha, bạn lắng nghe event như các event thông thường được bao đóng bởi cặp dấu `()`.

**contact-list.component.html**
```html
<tp-switches [checked]="contact.avatar?.round"
  (checkedChange)="switchesValueChange($event, i)">
</tp-switches>
```

**contact-list.component.ts**
```ts
...

export class ContactListComponent {
  ...
  switchesValueChange(event: boolean, index) {
    this.contacts[index].avatar.round = event;
  }
}
```

Sử dụng `outputs` array trong `@Component()` để thay thế cho việc dùng `@Output`.

> Lưu ý: cách này thường không được khuyến cáo sử dụng như `@Output`.

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
  styleUrls: ['./switches.component.scss'],
  outputs: ['change:checkedChange']
})
export class SwitchesComponent implements OnInit {
  @Input() checked: boolean = false;
  public change = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  emitChangeValue(event) {
    this.change.emit(event.target.checked);
  }
}
```

> Lưu ý: alias sẽ có thứ tự `internalEvent:externalEvent` ví dụ như `change:checkedChange`.

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/8uu9hh4_ZSU" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Documentation: <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html" target="_blank" rel="noopener noreferrer">https://angular.io/docs/ts/latest/cookbook/component-communication.html</a>

Source code các bạn lấy theo branch để theo dõi: <a href="https://github.com/tieppt/try-angular/tree/lesson-8" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-8</a>
