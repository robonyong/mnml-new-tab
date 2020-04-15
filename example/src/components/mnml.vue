<template>
  <div class="container">
    <h1><a href="https://chrome.google.com/webstore/detail/mkcjnnikmjpffddmjgmphcijkbdlnhfd">mnml new tab</a></h1>
    <p><a href="https://chrome.google.com/webstore/detail/mkcjnnikmjpffddmjgmphcijkbdlnhfd">install</a></p>
    <h3>
      a chrome extension for listing todos, checking them off, and clearing them
    </h3>
    <img src='../assets/add-todos.gif' />
    <h3>
      includes a spot for rich text notes and a column for a daily calendar view (if you opt in with gcal)
    </h3>
    <img src='../assets/add-notes.gif' />
  </div>
</template>

<script>
export default {
  name: 'mnml',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 60px;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: inherit;
}
a:hover {
  color: inherit;
  text-decoration: none;
}
img {
  display: block;
  max-width: 900px;
  margin: 0 auto;
}
</style>
