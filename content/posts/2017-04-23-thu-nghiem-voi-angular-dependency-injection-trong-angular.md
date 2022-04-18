---
id: 401
title: 'Thử Nghiệm Với Angular Phần 16: Dependency Injection Trong Angular'
date: 2017-04-23T09:59:27+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=401
url: /thu-nghiem-voi-angular-dependency-injection-trong-angular/
description: 'Bài viết này sẽ giới thiệu về Dependency Injection trong Angular – một trong những tính năng quan trọng của Angular – cho đến thời điểm hiện tại chỉ có Angular là framework duy nhất phía client cung cấp DI.'
images:
  - /assets/uploads/2017/04/angular-16-Dependency-Injection.jpg
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
  - Dependency Injection Trong Angular
  - Javascript
  - Lập Trình Angular 2
---
#  Dependency Injection Trong Angular
{:.no_toc}

Bài viết này sẽ giới thiệu về Dependency Injection trong Angular – một trong những tính năng quan trọng của Angular – cho đến thời điểm hiện tại chỉ có Angular là framework duy nhất phía client cung cấp DI.

Bài viết bao gồm các nội dung sau:

* ToC
{:toc}
{:.tp__toc}

## 1. Dependency là gì? {#tp-di-di-la-gi}

Khi trong class A có sự tồn tại của class B, dùng class B để làm một công việc nào đó, ta nói rằng class A đang phụ thuộc vào class B.

Ví dụ, chúng ta có class Computer và class CPU như sau:

```ts
class CPU {
  constructor() {}
  start() {
    console.log('CPU speed 3.2GHz');
  }
}

class Computer {
  public cpu: CPU;
  constructor() {}
}
```

Như ở ví dụ trên, class Computer đang phụ thuộc vào class CPU. Nếu muốn sử dụng property cpu trong class Computer, chúng ta phải khởi tạo ở đâu, vì nếu không khởi tạo chúng ta không thể sử dụng các method của property đó.

Chúng ta sẽ có 2 cách để khởi tạo như sau:

  1. Khởi tạo instance của class CPU trong class Computer và gán cho property cpu, trong trường hợp của JavaScript, TypeScript là khởi tạo trong hàm tạo.
  2. Khởi tạo instance của class CPU ở một context (container) bên ngoài, và truyền vào (inject) cho class Computer, trong trường hợp của JavaScript, TypeScript là truyền qua constructor của class Computer.

![Khởi tạo instance của class CPU](/assets/uploads/2017/04/DI.png){:class="img-responsive"}
{:class="text-center"}

Đối với cách 1, chúng ta đã hard-coded khi khởi tạo như sau:

```ts
class Computer {
  public cpu: CPU;
  constructor() {
    this.cpu = new CPU();
  }
}
```

Giả sử lúc này chúng ta chạy chương trình với đoạn code như sau:

```ts
(function context() {
  const computer = new Computer();
  computer.cpu.start();
})();
```

Đoạn code trên không có gì đặc biệt, chúng ta đã khởi tạo instance của class CPU bên trong contructor của class Computer. Vấn đề phát sinh bây giờ, nếu chúng ta muốn thay instance đó bằng một instance của một class CPU khác, lúc này chúng ta bắt buộc phải viết lại class Computer, ngay kể cả việc test chương trình cũng khó khăn vì chúng ta khó để thay đổi instance đó cho việc mock dữ liệu test.

## 2. Injection {#tp-di-injection}

Chúng ta có thể cải thiện code trên bằng cách sử dụng cách 2, với việc inject các phụ thuộc. Kết quả là chúng ta có thể dễ dàng test, thay đổi linh động các phụ thuộc. Chúng ta thay đổi code như sau:

```ts
class Computer {
  public cpu: CPU;
  constructor(cpu: CPU) {
    this.cpu = cpu;
  }
}
```

Và khi chạy chương trình chúng ta có thể inject phụ thuộc như sau:

```ts
(function context() {
  const computer = new Computer(new CPU());
  computer.cpu.start();
})();
```

Khi áp dụng Abstration, chúng ta hoàn toàn có thể sử dụng tính đa hình để dễ dàng thay đổi các phụ thuộc. Giả sử OCCPU là một class dẫn xuất của class CPU, bây giờ thay vì truyền vào instance của class CPU, chúng ta có thể truyền vào instance của class OCCPU.

```ts
(function context() {
  const computer = new Computer(new OCCPU());
  computer.cpu.start();
})();
```

Điều này thật tuyệt phải không nào, chúng ta không cần viết lại class Computer, không cần chạy lại tất cả các test case liên quan, ác mộng sẽ giảm đi rất nhiều.

Các bạn có thể đoán được mẫu thiết kế trên chính là **Dependency Injection (DI)**, chi tiết hơn đó là **constructor injection**.

## 3. DI system trong Angular như thế nào? {#tp-di-di-trong-angular-ntn}

Angular giúp chúng ta dễ dàng sử dụng DI trong ứng dụng, giả sử với đoạn code phía trên, chúng ta có thể biến đổi để sử dụng Angular DI như sau:

```ts
import { ReflectiveInjector, Inject, Injectable } from '@angular/core';

@Injectable()
class Computer {
  public cpu: CPU;
  constructor(@Inject(CPU) cpu) {
    this.cpu = cpu;
  }
}

(function context() {
  const injector = ReflectiveInjector.resolveAndCreate([Computer, CPU]);
  const computer = injector.get(Computer); 
  computer.cpu.start();
})();
```

Đối với việc sử dụng TypeScript, chúng ta có thể bỏ qua property của class và kèm theo keyword public/private vào tham số của constructor, TypeScript sẽ compile ra đúng những gì chúng ta cần như sau:

```ts
@Injectable()
class Computer {
  constructor(@Inject(CPU) public cpu: CPU) {}
}
```

Nếu phụ thuộc vào một class khác, chúng ta có thể bỏ qua **@Inject** như sau:

```ts
@Injectable()
class Computer {
  constructor(public cpu: CPU) {}
}
```

> Lưu ý rằng, trong Angular 4, tất cả các class có phụ thuộc đến các thành phần khác – như class Computer ở trên – sẽ phải decorate bằng **@Injectable()** decorator.

### 3.1 Các thành phần chính

DI trong Angular bao gồm 3 thành phần sau đây:

**Injector**: là một object có chứa các API để chúng ta tạo các instances của các phụ thuộc.

**Provider**: giống như một công thức để Injector có thể biết làm thế nào để tạo một instance của một phụ thuộc.

**Dependency**: là một object của một kiểu dữ liệu cần phải khởi tạo.

![Dependency Injection Trong Angular](/assets/uploads/2017/04/DI-angular.png){:class="img-responsive"}
{:class="text-center"}

Chúng ta đã sử dụng **ReflectiveInjector** để lấy được object của class Computer – đó  chính là **Injector** – thông qua method **resolveAndCreate**.

**@Inject/@Injectable** sẽ thêm các metadata vào class Computer, mà sau này sẽ được sử dụng bởi DI system. Trong trường hợp ở trên, **@Inject/@Injectable** sẽ đánh dấu cho DI biết tham số đầu tiên của hàm tạo của class Computer cần một instance của class CPU – nếu có nhiều tham số hơn, nó sẽ cho đúng thứ tự các tham số của hàm tạo để DI biết cách inject instances vào.

Để Injector có thể biết được cách để tạo một object, chúng ta cần cung cấp các providers, đó chính là đầu vào của method **resolveAndCreate**. Ở ví dụ trên, chúng ta đã truyền vào một mảng các class.

Thực chất đó là cách viết ngắn gọn của một mảng object có dạng như sau:

```ts
const injector = ReflectiveInjector.resolveAndCreate([
  { provide: Computer, useClass: Computer },
  { provide: CPU, useClass: CPU }
]);
```

Chúng ta có object với key **provide**, đây là **token** để DI system map với token mà **@Inject/@Injectable** đã mô tả. Khi có token, DI system sẽ đọc key tiếp theo, trong trường hợp trên là **useClass**, với key trên nó sẽ tạo instance của class tương ứng.

Token có thể là string hoặc một kiểu dữ liệu.

Trường hợp token và class giống nhau như ở trên, chúng ta có thể viết gọn lại như đã đề cập ở trên.

Tại sao có 2 cách mô tả cho cùng một vấn đề. Quay trở lại vấn đề khi chúng ta cần thay đổi một class khác mà vẫn sử dụng token trên, chúng ta chỉ cần bảo DI class chúng ta cần mà không phải sửa token ở class cần phụ thuộc. Ví dụ chúng ta sử dụng token CPU nhưng dùng class OCCPU như sau chẳng hạn:

```ts
class OCCPU extends CPU {
  constructor() {
    super();
  }
  start() {
    console.log('CPU speed 3.7GHz');
  }
}

{ provide: CPU, useClass: OCCPU }
```

Sau khi Injector khởi tạo các objects và inject các dependencies cần thiết, chúng ta có thể lấy ra được object mà chúng ta mong muốn với phương thức **get**:

```ts
const computer = injector.get(Computer);
```

Đến thời điểm này, mỗi khi bạn gọi injector.get cho provider dạng useClass sẽ luôn nhận được cùng một object – singleton.

### 3.2 @Injectable() và @Inject()

Quay trở lại đoạn code sau:

```ts
class CPU {
  constructor() {}
  start() {
    console.log('CPU speed 3.2GHz');
  }
}
```

Sẽ ra sao nếu bạn sử dụng **@Injectable** trong trường hợp hàm tạo có tham số là một kiểu dữ liệu primitive. Ngay kể cả khi bạn viết theo TypeScript như sau:

```ts
@Injectable()
class CPU {
  constructor(public speed: string) {}
  start() {
    console.log(`CPU speed ${this.speed}`);
  }
}
```

Lúc đó bạn không biết cách làm thế nào để báo cho DI biết kiểu của token là gì và DI sẽ không thể inject dependencies cần thiết cho bạn được, bạn có thể gặp lỗi sau đây.

> Cannot resolve all parameters for &#8216;CPU'(?). Make sure that all the parameters are decorated with Inject or have valid type annotations and that &#8216;CPU&#8217; is decorated with Injectable.

Lúc này bạn cần đến **@Inject** decorator, để gán cho tham số đó một token nào đó. Ví dụ:

```ts
@Injectable()
class CPU {
  constructor(@Inject('CPU Speed') public speed: string) {}
  start() {
    console.log(`CPU speed ${this.speed}`);
  }
}
```

Hoặc trong trường hợp bạn muốn sử dụng một token khác cho tham số thay vì kiểu dữ liệu của nó chẳng hạn.

```ts
@Injectable()
class Computer {
  constructor(@Inject(OCCPU) public cpu: CPU) {}
}
```

Bây giờ mọi thứ lại hoạt động thật hoàn hảo như chúng ta mong đợi.

Tóm lại, chúng ta sử dụng **@Injectable** với các kiểu dữ liệu tự định nghĩa – class mà chúng ta tạo ra. Còn đối với các kiểu dữ liệu primitive như boolean, string, number, etc; chúng ta cần **@Inject** để báo cho Angular biết, và chúng ta sẽ config các provider tương ứng cho chúng. Chúng ta có thể sử dụng kết hợp cả hai khi một class phụ thuộc vào cả kiểu dữ liệu primitive và kiểu tự định nghĩa.

## 4. Provider in-depth {#tp-di-di-in-depth}

Trong các ví dụ trước, chúng ta đã sử dụng provider với cấu trúc của một object với các key **provide** và **useClass** như sau.

```ts
{ provide: Computer, useClass: Computer }
```

Ngoài cách trên chúng ta có thể sử dụng một số cách dưới đây:

### 4.1 Sử dụng value

Nếu bạn sử dụng token như sau, value sẽ được truyền vào thay vì tạo instance của class.

```ts
{
  provide: 'API_ENDPOINT',
  useValue: 'http://tiepphan.com/blog/'
}
```

### 4.2 Sử dụng alias

Có nhiều token có thể cùng sử dụng một token đã có.

```ts
{ provide: Computer, useClass: Computer },
{ provide: Server, useExisting: Computer }
```

### 4.3 Sử dụng factory

Khi bạn muốn trả về một value dựa vào một điều kiện đầu vào, hoặc bạn muốn mỗi lần gọi đến instance của token sẽ cho một instance khác nhau thì bạn sử dụng factory function như sau.

```ts
{
  provide: CPU,
  useFactory: () => {
    return forOC ? new OCCPU() : new CPU();
  }
}
```

Hoặc bạn cần tạo một instance của một class có tham số của hàm tạo là kiểu primitive.

```ts
class CPU {
  constructor(public speed: string) {}
  start() {
    console.log(`CPU speed ${this.speed}`);
  }
}

{
  provide: CPU,
  useFactory: () => {
    return new CPU('3.5GHz');
  }
}
```

Factory có thể có dependencies, lúc đó chúng ta sử dụng key **deps**:

```ts
{
  provide: Computer,
  useFactory: (cpu) => {
    return new Computer(cpu);
  },
  deps: [CPU]
}
```

### 4.4 Overrides Provider

Khi có nhiều providers có cùng giá trị của key **provide** và không sử dụng config multi: true thì provider nào thêm vào sau cùng sẽ win.

```ts
{ provide: 'API_ENDPOINT',  useValue: 'http://tiepphan.com/blog/' },
{ provide: 'API_ENDPOINT',  useValue: 'http://tiepphan.com/thu-nghiem-voi-angular-dependency-injection-trong-angular/' }
```

Kết quả cuối cùng của API_ENDPOINT sẽ là `http://tiepphan.com/thu-nghiem-voi-angular-dependency-injection-trong-angular/`.

Để tránh nhập nhằng token, chúng ta sử dụng OpaqueToken (Angular 2) hoặc InjectionToken (chỉ có trong Angular 4+) để tạo các unique token.

```ts
const TOKEN_A = new OpaqueToken('token');
const TOKEN_B = new OpaqueToken('token');

const s = TOKEN_A === TOKEN_B; // false
```

Từ Angular 4 trở đi chúng ta sử dụng InjectionToken thay vì OpaqueToken (có thể bị bỏ đi trong Angular phiên bản > 4).

```ts
const TOKEN_A = new InjectionToken<string>('token');
const TOKEN_B = new InjectionToken<string>('token');

const s = TOKEN_A === TOKEN_B; // false
```


### 4.5 Multiple Provider

Trong trường hợp bạn muốn một token có thể có nhiều value, lúc này bạn có thể sử dụng multiple như sau:

```ts
{
  provide: 'API_ENDPOINT',
  useValue: 'http://tiepphan.com/blog/',
  multi: true
},
{
  provide: 'API_ENDPOINT',
  useValue: 'http://tiepphan.com/thu-nghiem-voi-angular-dependency-injection-trong-angular/',
  multi: true
},
```

Khi đó kết quả nhận được là một mảng các giá trị.

### 4.6 Forward References

Bây giờ đặt ra tình huống, bạn muốn tạo một provider mà class bạn định nghĩa sau khi tạo provider thì sẽ thế nào.  Hãy quan sát ví dụ sau:

```ts
export class Computer {
  run() {
    console.log('Computer Running...');
  }
}

@Component({
  selector: 'tp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: 'COMP', useClass: Computer, multi: true },
    { provide: 'COMP', useClass: Laptop, multi: true }
  ]
})
export class AppComponent {
  constructor(@Inject('COMP') comps) {
    comps.forEach(comp => comp.run());
  }
}

export class Laptop {
  run() {
    console.log('Laptop Running...');
  }
}
```


Chúng ta mong muốn nhận được một mảng để chạy, nhưng khi chạy chương trình chúng ta gặp phải lỗi chẳng hạn như:

> _Error: Invalid provider for COMP. useClass cannot be undefined._

Cách giải quyết lúc này, chúng ta sẽ sử dụng **Forward References** như sau:

```ts
{ provide: 'COMP', useClass: Computer, multi: true },
{ provide: 'COMP', useClass: forwardRef(() => Laptop), multi: true }
```

Trường hợp này bạn thường gặp phải khi tạo custom validator directive cho form. Dưới đây là một đoạn code trích ra từ Angular Forms module để validate một field là **required**:

```ts
export const REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true
};

@Directive({
  selector: '…',
  providers: [REQUIRED_VALIDATOR],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class RequiredValidator implements Validator {
}
```

Như bạn có thể thấy, Angular khai báo provider cần sử dụng đến class khai báo ngay sau nó. Đây chính là lúc chúng ta cần đến **Forward References**.

## 5. DI sử dụng trong thực tế {#tp-di-di-su-dung-trong-angular}

Trong ứng dụng Angular, bạn có thể cung cấp provider ở 2 cấp độ: Module và Component/Directive.

Ở cấp độ Module, bạn khai báo các provider vào mảng **providers** trong config của **@NgModule** decorator. Lúc này tất cả các thành phần bên trong NgModule đó sẽ sử dụng cùng instance của token tương ứng.

Ở cấp độ Component/Directive, bạn khai báo các provider vào mảng **providers** trong config của **@Component**/**@Directive** decorator. Lúc này mỗi instance của Component/Directive X sẽ sử dụng một instance của token (không phải dạng **multiple**) tương ứng. Nếu Component/Directive Y cũng dùng đến Dependency giống X, thì instance của dependency sử dụng trong X và Y là khác nhau.

Hãy quan sát các ví dụ sau:

```ts
import { PostService } from './services/post';

@NgModule({
  declarations: [
  //…
  ],
  imports: [
  //…
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Dependency được định nghĩa như sau:

```ts
@Injectable()
export class PostService {
  private counter = 0;
  constructor() {
    this.counter++;
    console.log(this.counter);
  }
}
```

Sử dụng trong các components:

```ts
export class CardComponent {
  constructor(private ps: PostService) { }
}
export class CollapseComponent {
  constructor(private ps: PostService) {
    console.log('========Collapse========');
  }
}
```

Khi sử dụng ở các components khác nhau nhưng chúng ta chỉ có một instance duy nhất. Các bạn có thể xem ở console chỉ có 1 lần duy nhất log ra counter là 1.Nếu chúng ta đặt providers ở Component, mỗi lần component được tạo ra sẽ sinh ra một instance khác.

```ts
@Component({
  selector: 'tp-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [PostService]
})
export class CollapseComponent implements OnInit {
  //…
}
```

![Component Dependency Injection](/assets/uploads/2017/04/component-di.png){:class="img-responsive"}
{:class="text-center"}

## 6. Services {#tp-di-services-la-gi}

Đến đây các bạn đã thấy việc sử dụng service là PostService. Ý tưởng về việc dùng service rất đơn giản.Nếu bạn có các phần code xử lý business logic – ví dụ gọi API để nhận gửi dữ liệu – hoặc có các phần code cần để sử dụng lại, chúng ta sẽ tách các phần đó ra khỏi Component và gọi chúng là services. Chúng ta không để các Component phụ thuộc chặt chẽ vào các services, mà thay vào đó sẽ inject thông qua DI system. Bằng cách đó, các Component có thể phụ thuộc vào Interface – Abstraction – thay vì phụ thuộc vào class cụ thể, giúp dễ dàng kiểm thử, bảo trì, nâng cấp. Trong thực tế, chúng ta thường khai báo các services ở cấp độ Module để sử dụng xuyên suốt trong chương trình.

## 7. Optional Dependencies {#tp-di-optional-di-la-gi}

Để đánh dấu một dependency là optional – có cũng được, không có cũng được – chúng ta sử dụng **@****Optional** decorator.

```ts
export class OptionalClass {
  public log: LogService;
  constructor(@Optional() log: LogService) {
    // do something if log exist
    if (log) {
      this.log = log;
    }
  }
}
```

Ngoài ra, DI trong Angular còn một số kiến thức về Controlling Visibility với các decorator **@SkipSelf**, **@Host** hay **@Self** các bạn có thể vào trang document chính thức để tìm hiểu thêm.

## 8. Video bài học {#tp-di-di-video}

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/bKadxkJJg4U" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## 9. Tham khảo {#tp-di-di-references}

<a href="https://angular.io/docs/ts/latest/cookbook/dependency-injection.html" target="_blank" rel="noopener noreferrer">https://angular.io/docs/ts/latest/cookbook/dependency-injection.html</a>

<a href="https://edwardthienhoang.wordpress.com/2015/03/30/tan-man-ve-dependency-injection/" target="_blank" rel="noopener noreferrer">https://edwardthienhoang.wordpress.com/2015/03/30/tan-man-ve-dependency-injection/</a>

<a href="https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html" target="_blank" rel="noopener noreferrer">https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html</a>

**Download PDF:** <a href="https://drive.google.com/file/d/0B-ux0B5az7XuNG9FaW5YVUJ6Nm8/view?usp=sharing" target="_blank" rel="noopener noreferrer">https://drive.google.com/file/d/0B-ux0B5az7XuNG9FaW5YVUJ6Nm8/view?usp=sharing</a>
