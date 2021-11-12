<template>
  <div class="about w-full px-t2 sm:px-t4 md:px-t8 py-t4 sm:py-t6">
    <h1 class="text-xl sm:text-3xl mb-t2 text-center">Σχετικά με αυτό το εργαλείο</h1>
    <p class="text-center text-gray-300">Φτιάχτηκε με 💝 και μεράκι από το <a href="https://projectpap.gq" target="blank" title="Project PAP Official">Project PAP</a></p>
    <p class="text-center text-lg font-bold pb-t4">Site built using Vue 3, Vite, and Tailwind CSS</p>
    <div class="bg-202020 shadow-lg rounded px-t2 sm:px-t4 py-0 mb-t2"
      v-for="(creditcat,index) in credits"
      :key="index"
    >
      <div :id="creditcat.title" class="pt-t3"></div>
      <h1 class="text-lg sm:text-xl mb-t2">{{ creditcat.title }}</h1>
      <ul class="pb-t3 list-disc overflow-x-auto">
        <li class="pb-t1 pl-t1"
          v-for="(sourcelist,index) in creditcat.sources"
          :key="sourcelist+index"
        >
          <a v-if="sourcelist.url" :href="sourcelist.url" rel="noopener noreferrer" class="truncate text-cccccc hover:text-gray-500 transition duration-300">
            <span class="text-gray-300">{{ sourcelist.title }} - </span>{{ sourcelist.url }}
          </a>
          <a v-else :href="sourcelist" rel="noopener noreferrer" class="truncate text-cccccc hover:text-gray-400 transition duration-300">{{ sourcelist }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        credits: [
          {
            title: 'Site',
            sources: [
              { title: "Vue 3 template starter by web2033", url: "https://github.com/web2033/vite-vue3-tailwind-starter" },
              { title: "Logo image by Timothy Dykes on Unsplash", url: "https://unsplash.com/photos/ekPfOrUhNgs"},
              "https://learnvue.co/2021/01/4-awesome-examples-of-vue-router-transitions/",
              { title: "Icons by Material Design Icons", url: "https://materialdesignicons.com/" },
              "https://www.gradientmagic.com/",
            ]
          },
          {
            title: 'Music',
            sources: [
              { title:"Powered by Spotify Web API", url:"https://developer.spotify.com/documentation/web-api/" },
              "https://google-webfonts-helper.herokuapp.com",
              "https://regex101.com/",
            ]
          },
          {
            title: 'Resources',
            sources: [
              { title: "Dan Fletcher - How To Hide API Keys Using Netlify", url: "https://www.youtube.com/watch?v=m2Dr4L_Ab14" },
              { title: "Fabio Rosado - Hide your API Keys with Netlify Functions", url: "https://dev.to/fabiorosado/hide-your-api-keys-with-netlify-functions-93m" }
            ]
          },
        ],
      }
    },
  }
</script>

<style scoped>

</style>
