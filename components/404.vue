<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,300,500);


.button {
  font-weight: 300;
  color: #fff;
  font-size: 1.2em;
  text-decoration: none;
  border: 1px solid #efefef;
  padding: .5em;
  border-radius: 3px;
  float: left;
  margin: 6em 0 0 -155px;
  left: 50%;
  position: relative;
  transition: all .3s linear;
}

.button:hover {
  background-color: #007aff;
  color: #fff;
}

p {
  font-size: 2em;
  text-align: center;
  font-weight: 100;
}

h1 {
  text-align: center;
  font-size: 15em;
  font-weight: 100;
}
</style>
<template>
  <div>
    <h1>404</h1>
    <p>Oops! Something is wrong.</p>
    <a class="button" href="/">
      <i class="icon-home"></i> Go Back To Home
    </a>
  </div>
</template>
<script>
export default {
}
</script>