import riot from 'riot';

require('./name.tag');

<app>
  <ul>
    <name each={ user in users } user={ user }></name>
  </ul>

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
</app>
