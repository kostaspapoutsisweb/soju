<template>
  <div class="about w-full text-center">
    <div class="pageheader flex items-end select-none min-h-64 md:min-h-20r">
      <router-link to="/">
        <div class="px-t2 sm:px-6 md:px-12 sm:py-t2 md:py-t4 flex flex-wrap sm:flex-no-wrap items-end content-start">
          <img class="w-24 h-24 xs:w-32 xs:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 mx-t2 sm:mx-0 my-t1 sm:my-0 rounded-full shadow-2xl filter contrast-125 select-none object-cover pointer-events-none" src="/media/logo-full.jpg" alt="Soju for Spotify">
          <div class="text-left mx-t2 md:mx-6 mb-t2 sm:mb-0">
            <h1 class="font-bold text-gray-200 text-xs md:text-sm uppercase my-2">Music Player</h1>
            <h1 class="font-bold text-gray-100 my-2 text-4xl sm:text-5xl md:text-6xl lg:text-5r leading-none">Soju for Spotify</h1>
            <h1 class="text-gray-400 text-sm sm:text-sm tracking-wide my-2">listen to music samples from Spotify links on any device</h1>
          </div>
        </div>
      </router-link>
    </div>

    <div class="bg-161616 text-eeeeee px-t2 sm:px-6 md:px-12 py-t2 md:py-6 text-left min-h-screen">

      <div class="bg-transparent grid grid-cols-2 gap-1 py-t1 sm:py-0 sm:px-t4 md:px-t8 sm:flex sm:flex-no-wrap sm:items-center sm:justify-center">
        <router-link
          v-for="navlink in navitems"
          :key="navlink.title"
          :to="navlink.url"
          class="inline-flex items-center justify-center px-4 py-3 sm:m-1 shadow-lg text-base font-medium leading-6 transition-colors duration-300 hover:bg-282828 rounded-md cursor-pointer"
          active-class="bg-222222"
          >{{ navlink.title }}</router-link
        >
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>


    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        navitems: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
        ],
      }
    },
    methods: {
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height;
      },
      enter(element) {
        window.scrollTo({top: 180, behavior: 'smooth'});
        const { height } = getComputedStyle(element);

        element.style.height = this.prevHeight;

        setTimeout(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = 'auto';
      },
      scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
    },
  }
</script>

<style scoped>
.pageheader {
  height: 20vh;
  background-image: linear-gradient(135deg, rgba(238, 238, 238, 0.1),rgba(16, 16, 16, 0.1)),linear-gradient(183deg, rgb(223,14,20),rgb(25,20,20));
  background-size: cover;
  background-position: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
