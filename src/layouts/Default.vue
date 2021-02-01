<template>
  <div>
    <header>
      <NavBar />
    </header>
    <main class="leading-normal tracking-normal text-white gradient">   
        <slot/>
    </main>
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'default-layout',
  components: {
    NavBar: () => import('@/components/NavBar.vue'),
    Footer: () => import('@/components/Footer.vue')
  }
}
</script>
