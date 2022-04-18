---
id: 384
title: 'Thử Nghiệm Với Angular Phần 15: Pipe Trong Angular'
date: 2017-04-10T02:53:51+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=384
url: /thu-nghiem-voi-angular-pipe-trong-angular/
description: 'Bài học này sẽ giới thiệu cho các bạn về Pipe trong Angular &#8211; một thành phần cơ bản của Angular.'
images:
  - /assets/uploads/2017/04/angular15.jpg
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
  - Angular Component
  - Angular Pipe
  - Lập Trình Angular 2
---

#  Pipe Trong Angular
{:.no_toc}

Bạn có dữ liệu nhận được từ đâu đó &#8211; từ API trả về &#8211; cho kiểu Date là dãy số kiểu long, bây giờ bạn phải hiển thị dữ liệu đó thành dạng mà người dùng có thể hiểu được trong ứng dụng viết bằng Angular. Làm thế nào để thực hiện điều đó trong Angular? Bài học này sẽ giới thiệu cho các bạn về Pipe trong Angular &#8211; một thành phần cơ bản của Angular.

  
Chúng ta sẽ cùng tìm hiểu các câu hỏi như:

* ToC
{:toc}
{:.tp__toc}

## 1. Pipe là gì? {#tnva-pipe-la-gi}

> Pipes transform displayed values within a template.

Pipe được dùng để chuyển đổi dữ liệu mà bạn hiển thị lên template cho người dùng có thể hiểu được.

Ví dụ: định dạng ngày tháng cho kiểu Date, viết hoa các chữ cái đầu tiên của tên riêng như tên người, tên thành phố, etc.

Pipe nhận một đầu vào và cho kết quả ở đầu ra, giống hình minh họa sau:

![Pipe - what is it?](/assets/uploads/2017/04/pipe-what-is-it.png){:class="img-responsive"}
{:class="text-center"}

Angular cung cấp cho chúng ta các Pipes sau đây (những Pipes là Stable):

<ul class="api-list">
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html" target="_blank" rel="noopener noreferrer">AsyncPipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/CurrencyPipe-pipe.html" target="_blank" rel="noopener noreferrer">CurrencyPipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html" target="_blank" rel="noopener noreferrer">DatePipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html" target="_blank" rel="noopener noreferrer">DecimalPipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/JsonPipe-pipe.html" target="_blank" rel="noopener noreferrer">JsonPipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/LowerCasePipe-pipe.html" target="_blank" rel="noopener noreferrer">LowerCasePipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/PercentPipe-pipe.html" target="_blank" rel="noopener noreferrer">PercentPipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/SlicePipe-pipe.html" target="_blank" rel="noopener noreferrer">SlicePipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/TitleCasePipe-pipe.html" target="_blank" rel="noopener noreferrer">TitleCasePipe</a>
  </li>
  <li class="api-item ng-scope">
    <a class="ng-binding" href="https://angular.io/docs/ts/latest/api/common/index/UpperCasePipe-pipe.html" target="_blank" rel="noopener noreferrer">UpperCasePipe</a>
  </li>
</ul>

![List Pipes trong Angular](/assets/uploads/2017/04/pipe-list-item.png){:class="img-responsive"}
{:class="text-center"}

Trong đó có TitleCasePipe là pipe có từ phiên bản Angular 4.

All Angular Pipes: <a href="https://angular.io/docs/ts/latest/api/#!?query=pipe" target="_blank" rel="noopener noreferrer">https://angular.io/docs/ts/latest/api/#!?query=pipe</a>

> Lưu ý rằng Angular không có FilterPipe or OrderByPipe như Angularjs.

## 2. Pipe sử dụng như thế nào? {#tnva-su-dung-pipe}

> The `Date` and `Currency` pipes need the _ECMAScript Internationalization API_. Safari and other older browsers don&#8217;t support it. You can add support with a polyfill.
> 
> Nếu bạn sử dụng `Date` và `Currency` pipes thì bạn cần phải có thêm polyfill để support trên các trình duyệt cũ, bằng việc thêm đoạn script sau vào file _index.html_
> 
> ```html
> <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
> ```
> 
> Hoặc nếu bạn sử dụng Angular CLI thì chạy lệnh cài đặt `npm install --save intl` và uncomment dòng sau trong file polyfill.ts
> 
> <a href="https://github.com/tieppt/try-angular/blob/lesson-15/contact-app/src/polyfills.ts#L68" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/blob/lesson-15/contact-app/src/polyfills.ts#L68</a>

Chúng ta có thể sử dụng một pipe duy nhất, có thể bao gồm cả tham số, hoặc có thể sử dụng pipe theo tuần tự &#8211; với kết quả của pipe này là đầu vào của pipe tiếp theo.
  
Ví dự sử dụng Pipe `lowercase` và `uppercase`: (sử dụng không có tham số)

{% raw %}
```ts
@Component({
  selector: 'lowerupper-pipe',
  template: `<div>
    <label>Name: </label><input #name (keyup)="change(name.value)" type="text">
    <p>In lowercase: {{value | lowercase}}</p>
    <p>In uppercase: {{value | uppercase}}</p>
  </div>`
})
export class LowerUpperPipeComponent {
  value: string;
  change(value: string) { 
    this.value = value; 
  }
}
```
{% endraw %}

Sử dụng có tham số như Pipe `date`:

{% raw %}
```ts
@Component({
  selector: 'date-pipe',
  template: `<div>
    <p>Today is {{today | date}}</p>
    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
    <p>The time is {{today | date:'jmZ'}}</p>
  </div>`
})
export class DatePipeComponent {
  today: number = Date.now();
}
```
{% endraw %}

Sử dụng nhiều tham số như Pipe `slice`:

{% raw %}
```ts
@Component({
  selector: 'slice-list-pipe',
  template: `<ul>
    <li *ngFor="let i of collection | slice:1:3">{{ i }}</li>
  </ul>`
})
export class SlicePipeListComponent {
  collection: string[] = ['a', 'b', 'c', 'd'];
}
```
{% endraw %}

Sử dụng nhiều Pipe tuần tự &#8211; Chaining Pipe:

Chúng ta có thể sử dụng nhiều Pipes để có được kết quả mong muốn.

![Chain Pipe](/assets/uploads/2017/04/pipe-chain-pipe.png){:class="img-responsive"}
{:class="text-center"}

{% raw %}
```ts
@Component({
  selector: 'date-pipe',
  template: `<div>
    <p>Today is {{today | date | lowercase}}</p>
    <p>Or if you prefer, {{today | date:'fullDate' | lowercase}}</p>
    <p>The time is {{today | date:'jmZ' | uppercase}}</p>
  </div>`
})
export class DatePipeComponent {
  today: number = Date.now();
}
```
{% endraw %}

Trong Angular chia làm hai loại Pipe là **pure pipe** và **impure pipe**.

Pure pipe: chỉ thực hiện thay đổi khi đầu vào thay đổi. (các immutable objects, primitive type: `string`, `number`, `boolean`, etc): `lowercase`, `uppercase`, `date`, etc.

Impure pipe: thực hiện thay đổi mỗi chu kỳ của Change detection (chu kỳ kiểm tra xem các state trong ứng dụng có thay đổi không để update lên view): `async`, `json`, etc.

## 3. Cách tạo một Custom Pipe trong Angular như thế nào? {#tnva-tao-custom-pipe}

Đầu tiên, chúng ta tạo một class và decorate nó với decorator _**@Pipe**_, decorator này cần tối thiểu một object có property _**name**_, chính là tên của pipe.

Ví dụ, chúng ta có thể tạo một pipe để convert nhiệt độ giữa độ C và độ F với tên _tempConverter_ như sau:

```ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe {
}
```

> Mặc định khi tạo là pure pipe.

Tiếp theo, chúng ta cần implement một interface là `PipeTransform`, và implement hàm `transform` của interface đó:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}
```

Trong hàm transform, chúng ta sẽ thực hiện các công việc để biến đổi đầu vào ra kết quả mong muốn ở đầu ra.

Lưu ý: chúng ta sử dụng <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters" target="_blank" rel="noopener noreferrer">Rest parameters của ES2015</a> &#8220;&#8230;args&#8221; để nhận tất cả các tham số được truyền vào cho pipe.

Sau khi hoàn thành implement class Pipe ở trên, chúng ta cần khai báo vào NgModule mà nó thuộc về để có thể sử dụng nó trong toàn module đó:

```ts
import { TempConverterPipe } from './pipes/temp-converter.pipe';

@NgModule({
  declarations: [
    // các Component, Directive, Pipe khác
    TempConverterPipe
  ],
  imports: [...],
  providers: [...],
  //...
})
export class AppModule { }
```

Code hoàn chỉnh cho Pipe converter tại đây: <a href="https://github.com/tieppt/try-angular/blob/lesson-15/contact-app/src/app/pipes/temp-converter.pipe.ts" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/blob/lesson-15/contact-app/src/app/pipes/temp-converter.pipe.ts</a>

Sử dụng pipe ở trong Component như sau:

{% raw %}
```html
Temperature {{ temp | tempConverter:true:'F' }}
```
{% endraw %}

## 4. Video bài học {#tnva-pipe-video}

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/cECpOh3lScM" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## 5. Tham khảo

Angular Pipe Official Document: <a href="https://angular.io/docs/ts/latest/guide/pipes.html" target="_blank" rel="noopener noreferrer">https://angular.io/docs/ts/latest/guide/pipes.html</a>

Code: <a href="https://github.com/tieppt/try-angular/tree/lesson-15" target="_blank" rel="noopener noreferrer">https://github.com/tieppt/try-angular/tree/lesson-15</a>

