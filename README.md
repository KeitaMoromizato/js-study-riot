 # JavaScript勉強会 # Riot.js

 ## Install

 ```
 $ git clone https://github.com/KeitaMoromizato/js-study-riot
 $ cd js-study-riot
 $ npm i
 ```

 ## run

 ```
 $ npm start
 ```

## 例
### Concept
#### JS in HTML
ReactやAngular2はJS in HTML(JSX)の考え方が強い。JSファイルのなかに、独自の記法でHTMLを記述しコンポーネント化する。
一方Riot.jsはJS in HTML。HTMLライクなファイルがベースとしてあり、そこにJSを追加していく。その昔`<script>`タグに直接ロジックを書いていたのに似ている。

JS in HTMLだが、実際はコンパイル後にはJSファイルになる。その点ではReactともそう変わらないが、コーディング時の見た目の問題で、コーダーに優しい。

### Component

Riotのコンポーネントは`.tag`という拡張子を付けて管理する。

たとえばユーザー一覧を表示する画面。

```js
import riot from 'riot';

require('./name.tag');

<app>
  <ul>
    <name each={ user in users } user={ user }></name>
  </ul>

  <script>
    this.users = [
      {
        first: "Hello",
        last: "World"
      },
      {
        first: "Hoge",
        last: "Taro"
      }
    ];
  </script>
</app>
```

これをReactで書くとこうなる。

```js
import React, { Component } from 'react';
import Name from './name';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state.users = [
      {
        first: "Hello",
        last: "World"
      },
      {
        first: "Hoge",
        last: "Taro"
      }
    ];
  }

  render() {
    return (
      <ul>
        { this.state.users.map(u => <Name user={ u } />) }
      </ul>
    );
  }
}
```

### event

Buttonのclickイベントを拾うには、`onclick`を使用する。

```js
<app>
  <button onclick={ onClick }>Click</button>

  <script>
    this.onClick = (e) => {
      console.log("handleClick", e, this.users);
    }
  </script>
</app>
```

独自のコンポーネントにイベントを作る場合

```js
import riot from 'riot';

<name>
  <h1>{ opts.user.last } - { opts.user.first }</h1>
  <button onclick={ onClick }>Test</button>

  <script>
    this.onClick = (e) => {
      if (this.onsubmit) this.onsubmit(this.user);
    };
  </script>
</name>
```



 ## 参考

 * [Riot.js](http://riotjs.com/ja/)
