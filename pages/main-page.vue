<template>
  <div class="container">
    <div class="ribbon top">
      <a href="/">
        Volver
      </a>
    </div>
    <div class="content">
      <div class="links">
        Gráfica
      </div>
    </div>
    <div class="ribbon"></div>
  </div>
</template>

<script>
export default {
  middleware: 'log',
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

.ribbon {
  background: #ff8a32;
  min-height: 100px;
  padding: 20px;
  &.top {
    a {
      display: flex;
      justify-content: flex-start;
      color: #fff;
    }
  }
}

.top a {
  justify-self: start;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin: 2rem 0;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
