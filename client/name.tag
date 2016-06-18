const riot = require('riot');

<name>
  <h1>{ opts.user.last } - { opts.user.first }</h1>
  <button onclick={ onClick }>Test</button>

  <script>
    this.onClick = (e) => {
      if (this.onsubmit) this.onsubmit(this.user);
    };
  </script>
</name>
