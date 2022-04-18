---
id: 2024
title: 'Advanced Layout with CSS Grid Area'
date: 2021-01-31T00:00:00+00:00
author: Tuan Le
layout: post
guid: https://www.tiepphan.com/?p=2024
url: /advanced-layout-css-grid-area/
description: 'Cùng nhau thử nghiệm cách dựng layout với CSS Grid Area'
image: /assets/uploads/2021/01/1_grid_area.png
categories:
  - Web Development

tags:
  - CSS
  - CSS Grid

---

# Mở đầu
{:.no_toc}

Trong bài viết ngày hôm nay, mình sẽ cùng các bạn tìm hiểu về một khái niệm nâng cao khi viết CSS đó là dựng layout với Grid Area. Để truyền tải khái niệm một cái rõ ràng và dễ tiếp thu nhất mình sẽ cùng các bạn đi qua 2 ví dụ để cùng thực hành về khái niệm CSS Grid Area.

* ToC
{:toc}
{:.tp__toc}


## Named Grid Areas
Ở ví dụ đầu tiên, chúng ta sẽ đến với khái niệm về `Named grid area` thông qua việc thực hành dựng layout như trong hình ảnh bên dưới.

![Named Grid Area](/assets/uploads/2021/01/grid-1.jpg){:class="img-responsive"}
{:class="text-center"}

Như trên hình ảnh thể hiện, các khối từ 1 đến 5 được bố trí theo một cách tùy biến mà ta khó có thể sử dụng các CSS thông thường để thực hiện layout này.

Bước đầu tiên, ta sẽ chuẩn bị các thẻ html cần thiết và một số CSS để ví dụ được "fancy" hơn :D

```html
<div class="grid-container-1">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
    <div class="card">5</div>
</div>
```

```css
.card {
    background: #fff;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 10%);
    min-height: 300px;
    margin: 1rem;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

Xong công tác chuẩn bị, nhìn trên source code đã có, ta có thế thấy rõ ràng, hiện tại, mọi CSS tiếp theo được viết sẽ đc targe tới class `grid-container-1` bao ngoài cùng các khối từ 1 đến 5.

Như chính cái tên của khái niệm này, sơ lược, chúng ta sẽ đặt tên cho các "grid item" thông qua thuộc tính css `grid-area` và đặt những cái tên đã đặt này vào một "line-based" template thông qua thuộc tính `grid-template-areas` của parent để các khối đã được đặt tên được đặt đúng vị trí mà template đã định nghĩa.

Đi vào ví dụ, bước đầu tên ta sẽ thực hiện đặt tên các "grid item" từ 1 đến 5 tương ứng.
```css
.grid-container-1 .card:nth-child(1) {
    grid-area: card1;
}

.grid-container-1 .card:nth-child(2) {
    grid-area: card2;
}

.grid-container-1 .card:nth-child(3) {
    grid-area: card3;
}

.grid-container-1 .card:nth-child(4) {
    grid-area: card4;
}

.grid-container-1 .card:nth-child(5) {
    grid-area: card5;
}
```

Để có thể dựng được template đúng với ví dụ, ta sẽ thực hiện khảo sát yêu cầu để dựng một template chính xác. Dựng vào yêu cầu, ta có thể thấy được layout này được dựng dưới dạng "bàn cờ" và các khối của chúng ta sẽ chiếm vị trí của một số "ô cờ" tương ứng.

![Named Grid Area](/assets/uploads/2021/01/grid-1-2.jpg){:class="img-responsive"}
{:class="text-center"}

Sau khi khảo sát và hiểu yêu cầu của layout, ta thực hiện dựng template cho layout target vào class `grid-container-1` bao ngoài cùng như sau.

```css
.grid-container-1 {
    display: grid;
    grid-template-areas: 
       "card1 card1 card5"
       "card2 card4 card5"
       "card3 card4 card5"
       "card3 card4 card5";
}
```

Ta có thể dễ dàng thấy được, template đc viết dưới dạng các dòng text, mỗi dòng thể hiện những cái tên ta đặt cho từng khối từ bước trước và vị trí của chúng trên "bàn cờ" mà ta mong muốn.

Cụ thể:

![Named Grid Area](/assets/uploads/2021/01/grid-1-1.jpg){:class="img-responsive"}
{:class="text-center"}

Như vậy, ta đã thực hiện xong một layout tùy biến bằng cách sử dụng Named Grid Area. Tuy nhiên, cách thực hiện này vẫn tồn tại hạn chế, ta chỉ có thể dựng được các layout có dạng các hình chữ nhật được được lấp đầy trong một "bàn cờ", không có khả năng dựng các layout tùy biến dạng T hoặc L.

Để có thể dựng được các layout dạng tùy biến khác, ta sẽ đến với cách tiếp cận thứ 2 trong bài viết về CSS Grid Area.


## `grid-area` cell grid placement

Ở phần này, ta sẽ cùng nhau thực hiện một layout tùy biến khác khác, được mô tả bằng hình ảnh bên dưới.

![Cell Grid Placement](/assets/uploads/2021/01/grid-2.jpg){:class="img-responsive"}
{:class="text-center"}

Qua hình ảnh mô tả ví dụ, đây không giống với layout ở ví dụ thứ nhất, và ta cũng không thể sử dụng cách đặt tên để dựng được layout này.

Trước khi bắt đầu, ta cũng sẽ thực hiện các bước chuẩn bị tương tự như ví dụ đầu tiên.

```html
<h1>#1</h1>
<div class="grid-container-2">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
    <div class="card">5</div>
</div>
```

Ở ví dụ này, ta vẫn sẽ dựa trên tư tưởng về việc chia "bàn cờ" ở ví dụ trước, tuy nhiên ở cách tiếp cận này, ta sẽ chỉ định vị trí, kích thước của từng "ô cờ" để đặt trên "bàn cờ". Dễ dàng nhận thấy, layout của chúng ta có 3 cột và chúng ta sẽ thực hiện css cho `grid-container-2` bao ngoài.

```css
.grid-container-2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

Để chỉ định kích thước, vị trí của từng khối, ta sẽ đến với 1 cách viết khác của `grid-area`. Ngoài việc để đặt tên cho từng khối như ở ví dụ trên, `grid-area` còn là cách viết short-hand của 4 thuộc tính khác theo đúng thứ tự như sau.

```css
grid-area: auto/auto/auto/auto;
#    grid-row-start: auto;
#    grid-column-start: auto;
#    grid-row-end: auto;
#    grid-column-end: auto;
```

Như vậy, ta có thể dẽ dàng thấy được, ta sẽ chỉ định "tọa độ" của từng khối, các khối sẽ bắt đầu và kết thức tại các dòng và các cột nào hoàn toàn do ta chỉ định, các khối sẽ hiện thị chính xác vào các vị trí đã được chỉ định.

Ta vẫn sẽ thực hiện khảo sát yêu cầu và vẽ ra một "bàn cờ" tương ứng, từ đó có được các "tọa độ" chính xác cho các khối thành phần.

![Cell Grid Placement](/assets/uploads/2021/01/grid-2-1.jpg){:class="img-responsive"}
{:class="text-center"}

Như vậy, thông qua "bàn cờ" ta có thể thực hiện việc chỉ định "tọa độ" tương ứng cho từng khối để hoàn thành layout theo đúng yêu cầu.

```css
.grid-container-2 .card:nth-child(1) {
    grid-area: 4/1/8/auto;
}

.grid-container-2 .card:nth-child(2) {
    grid-area: 2/2/6/auto;
}

.grid-container-2 .card:nth-child(3) {
    grid-area: 6/2/10/auto;
}

.grid-container-2 .card:nth-child(4) {
    grid-area: 1/3/5/auto;
}

.grid-container-2 .card:nth-child(5) {
    grid-area: 5/3/9/auto;
}
```

## Tổng kết
Qua 2 ví dụ trên, mình đã cùng mọi người đi qua 2 ví dụ dựng layout tùy biến với CSS Grid Area. Cách diễn giải có thể chưa dễ hiểu với tất cả mọi người, tuy nhiên, để có thể sử dụng thành thạo và hình thành được "phản xạ" với các layout này không có cách nào khác là các bạn hãy code thật nhiều để quen tay hơn.

Chúc các bạn nhiều sức khỏe và thành công.