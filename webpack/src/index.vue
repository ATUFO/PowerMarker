<template>
    
    <div>
        <input id="pm-kwinput" placeholder="mark something..."/><button class="pm-btn">Mark</button>
    </div>
    <div>
        <ul class="pm-hist" style="overflow:auto;"/>
    </div>
    
    
</template>
  <script>
  
  export default {
    name: 'App',
    data() {
        return {
        message: 'Hello Vue!!'
    }
  }
  }
  </script>