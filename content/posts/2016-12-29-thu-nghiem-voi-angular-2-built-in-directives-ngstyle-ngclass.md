---
id: 225
title: 'Thử Nghiệm Với Angular 2 Phần 4: Built-in Directives NgStyle, NgClass'
date: 2016-12-29T06:38:51+00:00
author: Tiep Phan
layout: post
guid: https://www.tiepphan.com/?p=225
url: /thu-nghiem-voi-angular-2-built-in-directives-ngstyle-ngclass/
description: 'Trong bài học này, chúng ta sẽ tìm hiểu về những Attribute Directives như NgStyle NgClass và property binding cho class, style'
image: /assets/uploads/2016/12/angular2-PHAN4.jpg
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
  - Javascript
  - Lập Trình Angular 2
  - Style Component
  - Web Dev
toc: true
---

# Built-in Directives NgStyle, NgClass

Trong những bài trước của series **Thử Nghiệm Với Angular 2** mình đã giới thiệu một số <a href="https://angular.io/docs/ts/latest/guide/structural-directives.html" target="_blank">Structual Directives</a> và hướng dẫn <a href="/thu-nghiem-voi-angular-2-style-component-view-encapsulation/" target="_blank">Style cho Component, View Encapsulation</a>. Trong bài học này, chúng ta sẽ tìm hiểu về những Attribute Directives như <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngStyle" target="_blank">NgStyle</a>, <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngClass" target="_blank">NgClass </a>và property binding cho class, style.


## Style binding

Cú pháp:

```html
[style.style-property]="expression"
// or camel case
[style.styleProperty]="expression"
// or
[style.style-property.<unit>]="expression"
// or
[style.styleProperty.<unit>]="expression"
```

Example:

```html
<button [style.color]="isSpecial ? 'red': 'green'">Some button</button>

<button [style.font-size.em]="isSpecial ? 3 : 1" >Yes, another button</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Huh, button again</button>
```

Tương tự cho camel case và unit px, rem, vh, vw, ...

## NgStyle

Cú pháp:
      
```html
<some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
<some-element [ngStyle]="objExp">...</some-element>
```

Example:

```html
<div [ngStyle]="{
    // CSS property names
    'font-style': canSave ? 'italic' : 'normal',        // italic
    'font-weight': !isUnchanged ? 'bold' : 'normal',    // normal
    'font-size.px': isSpecial ? 24 : 8,                 // with unit
  }">
  This div is cool.
</div>
```

Hoặc:

```html
<div [ngStyle]="objStyle">
  This div is cool.
</div>
```

```ts
objStyle = {
  // CSS property names
  'font-style': this.canSave ? 'italic' : 'normal',        // italic
  'font-weight': !this.isUnchanged ? 'bold' : 'normal',    // normal
  'font-size.px': this.isSpecial ? 24 : 8,                 // with unit
};
```

## Class binding

Cú pháp:

```html
[class.<className>]="expression"
```

Example:

```html
<button class="btn" [class.active]="isActive">
    Some button need toggle class active base on isActive variable
</button>

<button class="btn" [class.active]="tabIndex == 1">
    Some button need toggle class active base on conditional tabIndex == 1
</button>
```

## NgClass
    

Cú pháp:

```html
<some-element ngClass="first second">...</some-element>     // bind string
<some-element [ngClass]="'first second'">...</some-element> // bind string value
<some-element [ngClass]="['first', 'second']">...</some-element> // bind array
<some-element [ngClass]="{    // bind object
    'first': true,
    'second': true,
    'third': false
    }">
    ...
</some-element>
<some-element [ngClass]="stringExp|arrayExp|objExp">    // variable
    ...
</some-element>
```
      
<blockquote>
  <p>
    &#8211; <em><strong>string:</strong> </em>là một list các CSS class, cách nhau bởi dấu cách.
  </p>
  
  <p>
    &#8211; <em><strong>array:</strong> </em>là array string CSS class.
  </p>
  
  <p>
    &#8211; <em><strong>object:</strong></em> key -> value, nếu value = true thì add, ngược lại thì remove.
  </p>
</blockquote>

Example:
      
```html
<button class="btn" [ngClass]="'active btn-primary'">
    String binding
</button>
// or
<button class="btn" ngClass="active btn-primary">
    String binding
</button>
// or
<button class="btn" [ngClass]="['active', 'btn-primary']">
    Array binding
</button>
// or
<button class="btn" [ngClass]="{active: tabIndex == 1}">
    Object binding
</button>
```

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/D45vVWG3hpU" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

<a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngStyle" target="_blank">NgStyle</a>

<a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngClass" target="_blank">NgClass </a>
