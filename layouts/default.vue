<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: Lato, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--orange {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #ff8a32;
  color: #ff8a32;
  text-decoration: none;
  padding: 10px 30px;
}

.button--orange:hover {
  color: #fff;
  background-color: #ff8a32;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
