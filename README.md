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

### build

`.tag`ファイルをjsファイルに変換する必要が有るため、ビルドを行います。
ここではwebpackの`riotjs-loader`を使用していますが、browserify/Grunt/Gulp用のモジュールもあります。
ReactのようにBabel presetは用意されていないので、`babel-loader`をかける前に`preLoaders`で処理します。

```js
  module: {
    preLoaders: [
      {
        text: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riotjs-loader',
        query: {
          type: 'none'
        }
      }
    ],
```

エンドポイントはこのようになります。`riot.mount(`*`)`で全てのカスタムタグをマウントします。
webpackでバンドルする必要があるため、`require()`でタグを指定します。

```js
import riot from 'riot';

require('./app.tag');

riot.mount('*');
```

### サーバーサイドレンダリング

サーバーサイドにてhtml(文字列)への書き出しに対応している。

```js
const riot = require('riot');

require('../build/app');

const html = riot.render("app");
console.log(html);
```

ただし、注意点がいくつか

#### ビルドが必要

`.tag`ファイルはJSのパースエラーが発生するため、事前にビルドが必要。babel-presetも提供されていないので、ビルドパイプラインの構築が面倒。

```
  "scripts": {
    "build:server": "riot client/ build/",
  }
```

#### フロントとの共通化ができない

`riot`コマンドでビルド後、出力されるファイルは`.js`になる。そのため、ファイル内で`require('./name.tag')`のように拡張子指定で依存性解決をしているとNG。
一方で、クライアントサイドのビルドでは`.tag`ファイルを指定する必要があるため、共通化が難しい。

**クライアントサイド**

```js
const riot = require('riot');
require('./name.tag');

<app>
  <ul>
    <name each={ user in users } user={ user } onsubmit={ onsubmit }></name>
  </ul>
</app>
```

**サーバーサイド**

```js
const riot = require('riot');
require('./name');

<app>
  <ul>
    <name each={ user in users } user={ user } onsubmit={ onsubmit }></name>
  </ul>
</app>
```

## テスト
テストを行う方法はいくつかあるが、ここでは`JSDOM`を使う方法を紹介する。JSDOMはnode.js上でDOMを再現できるライブラリ。
tagファイルを`Riot.compile`で動的にJSに変換し、それをJSDOMに読み込ませてDOMのテストを行っている。

(※ただし`name.tag`内でrequireを使っているため、実行時にコケる。対処法を検討中...)

```js
import jsdom from 'jsdom';
import { readFileSync } from 'fs';
import { compile } from 'riot';
import assert from 'power-assert';

const riot = readFileSync(require.resolve('riot/riot'), 'utf-8');
const tag = compile(readFileSync('./client/name.tag', 'utf-8'));

describe('riot sample', () => {

  context('name tag', () => {

    it('should rendering', (done) => {

      jsdom.env({
        html: '<div><name /></div>',
        src: [riot, tag],
        done: (err, window) => {
          const names = window.riot.mount('name', {user: {last: 'hoge', first: 'huga'}});

          const document = window.document;

          assert(document.querySelector('h1').innerHTML === 'hoge - huga');
          done();
        }
      });
    });
  });
});
```

## 参考

 * [Riot.js](http://riotjs.com/ja/)
 * [APIリファレンス](http://riotjs.com/ja/api/)
