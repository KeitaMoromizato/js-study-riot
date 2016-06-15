const riot = require('riot');
require('./name.tag');

<app>
  <ul>
    <name each={ user in users } user={ user } onsubmit={ onsubmit }></name>
  </ul>

  <button onclick={ onClick } >Click</button>

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

    this.onClick = (e) => {
      console.log("handleClick", e, this.users);
    }

    this.onsubmit = (o) => {
      console.log("onSubmit", o);
    }

  </script>

</app>
