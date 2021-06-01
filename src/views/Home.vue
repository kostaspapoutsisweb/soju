<template>
  <div class="mx-auto w-full md:w-4/5 lg:w-3/4 2xl:w-1/2">

    <div class="flex flex-no-wrap justify-between items-center pt-t4 pb-t2">
      <h1 class="font-semibold text-3xl tracking-tighter">Play a Spotify Sample</h1>
    </div>

    <input class="mt-2 md:mb-t4 bg-gray-800 rounded p-t1 w-full sm:w-3/4 xl:w-4/5" v-model="url" placeholder="Paste any Spotify track, album, or playlist link here..." />

    <div class="inline-flex items-center justify-center px-4 py-3 shadow-lg text-base font-medium leading-6 transition duration-300 bg-202020 hover:bg-282828 rounded-md cursor-pointer mx-t0 mt-t1 mb-t3 sm:my-t4 sm:mx-t2" @click="getSpotifyData()">Get Data</div>

      <div class="grid grid-cols-1 xl:w-4/5 2xl:w-full 2xl:grid-cols-2 gap-4">

        <div 
          v-for="sitem in spotifyData"
          :key="sitem.id"
        >
          <div class="bg-202020 hover:bg-282828 grid grid-cols-1 sm:grid-cols-1f3f gap-4 sm:gap-8 anim-fade-in transition-all duration-300 p-t2 rounded-sm"
            v-if="sitem.id !== null"
          >
            <div class="grid grid-cols-1f3fa sm:block">
              <div class="relative rounded-sm shadow-2xl overflow-hidden">
                <a :href="sitem.url" class="h-auto">
                  <img :src="sitem.data.images[0].url" class="w-full h-auto" />
                </a>
              </div>
              <div class="px-t2 sm:px-0 sm:pt-t2">
                <h2 class="truncate pt-0 font-semibold tracking-tight">{{sitem.data.name}}</h2>
                <p class="truncate text-gray-500 text-sm sm:text-base tracking-tighter"
                  v-if="sitem.type == 'playlist'"
                >{{ sitem.data.owner.display_name }}<br>{{ sitem.data.tracks.total }} songs</p>
                <p class="truncate text-gray-500 text-sm sm:text-base tracking-tighter"
                  v-else
                >{{ formatArtists(sitem.data.artists) }}</p>
              </div>
              <a :href="sitem.url" class="inline-block sm:my-3">
                <div class="bg-spotifygreen hover:bg-spotifygreen-darker transition-all duration-300 transform hover:scale-105 rounded-full font-semibold p-t1 xs:px-t2 xs:py-t05 shadow-lg hover:shadow-xl">
                  <svg class="inline-block" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                  <span class="hidden xs:inline-block text-sm pl-t1 text-white">Play</span>
                </div>
              </a>
            </div>
            <div>
              <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-2"
                v-if="sitem.type == 'playlist'"
              >
                <div class="flex pb-t1 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  v-for="strack in sitem.data.tracks.items"
                  :key="strack.id"
                  @click="play(strack.track.preview_url)">
                  <div class="w-6 sm:w-8 flex-none">
                    <!-- mdi-music-note-off -->
                    <svg v-if="strack.track.preview_url == null" class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z" />
                    </svg>
                    <!-- mdi-pause -->
                    <svg v-else-if="playingUrl == strack.track.preview_url && isPlaying == true" class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                    </svg>
                    <!-- mdi-play -->
                    <svg v-else class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                  <div class="flex-grow overflow-hidden">
                    <p class="text-sm xs:text-base p-0 mb-1 leading-5" :title="strack.track.name">{{strack.track.name}}</p>
                    <p class="text-gray-500 text-xs xs:text-sm leading-4 p-0 mb-0" :title="formatArtists(strack.track.artists)">{{ formatArtists(strack.track.artists) }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-2"
                v-else
              >
                <div class="flex pb-t1 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  :class="{ 'bg-gray-700 p-2 rounded' : sitem.track == strack.id }"
                  v-for="strack in sitem.data.tracks.items"
                  :key="strack.id"
                  @click="play(strack.preview_url)">
                  <div class="w-6 sm:w-8 flex-none">
                    <!-- mdi-music-note-off -->
                    <svg v-if="strack.preview_url == null" class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z" />
                    </svg>
                    <!-- mdi-pause -->
                    <svg v-else-if="playingUrl == strack.preview_url && isPlaying == true" class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                    </svg>
                    <!-- mdi-play -->
                    <svg v-else class="m-1 mr-2 w-4 h-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                  <div class="flex-grow overflow-hidden">
                    <p class="text-sm xs:text-base p-0 mb-1 leading-5" :title="strack.name">{{strack.name}}</p>
                    <p class="text-gray-500 text-xs xs:text-sm leading-4 p-0 mb-0" :title="formatArtists(strack.artists)">{{ formatArtists(strack.artists) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-202020 hover:bg-282828 gap-4 sm:gap-8 anim-fade-in transition-all duration-300 p-t2 rounded-sm"
            v-else
          >
            <p>Invalid link format! Please try again...</p>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        isPlaying: false,
        player: null,
        playingUrl: null,
        requestOptionsGet: {},
        url: "",
        spotifyData: [],
      }
    },
    async created() {
      if (this.$store.state.access_token == '') {
        const responsePost = await fetch("/.netlify/functions/getSpotifyToken");
        const dataPost = await responsePost.json();
        this.$store.commit('access_token', dataPost.data.access_token)
      }
      this.requestOptionsGet = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + this.$store.state.access_token }
      };

      // Import from vuex if exists
      this.spotifyData = this.$store.state.spotifyData

      // If there is ?url= parameter, directly put into field and run
      if (this.$route.query.s) {
        this.url = this.$route.query.s
        this.getSpotifyData()
      }
      
    },
    methods: {
      formatArtists(artistArray) {
        let content = ""
        for (var i = 0; i < artistArray.length; i++) {
          content += artistArray[i].name+", ";
        }
        content = content.slice(0, -2) // Remove the extra ', ' at the end
        return content
      },
      async getSpotifyData() {
        // Parse data
        let itemFormat;
        let itemId;

        // Safari doesn't support lookbehind regex, workaround by matching '/' and splicing
        // let formatFinder = /(?<=com\/)\w+(?=\/)/m;
        let formatFinder = /\/\w{4,12}(?=\/)/m;
        let formatResults;
        if ((formatResults = formatFinder.exec(this.url)) !== null) {
          formatResults.forEach((formatRes) => {
            itemFormat = formatRes.substring(1);
            console.log(itemFormat);
          });
        }

        // let idFinder = /(?<=com\/\w+\/)\w+(?=\?|$)/m;
        let idFinder = /\/\w{14,26}(?=\?|$)/m;
        let idResults;
        if ((idResults = idFinder.exec(this.url)) !== null) {
          idResults.forEach((idRes) => {
            itemId = idRes.substring(1);
            console.log(itemId);
          });
        }

        // GET playlist data using token
        if (itemFormat == "track") {
          let resp = await fetch("https://api.spotify.com/v1/tracks/"+itemId, this.requestOptionsGet);
          let trackData = await resp.json().then(trackData => ({
            trackId: trackData.id,
            albumId: trackData.album.id,
            trackUrl: trackData.external_urls.spotify
          }));
          let albumData = await this.getSpotifyAlbum(trackData.albumId)
          this.spotifyData.unshift({
            type: "album",
            id: albumData.id+Date.now(),
            url: trackData.trackUrl,
            track: trackData.trackId,
            data: albumData
          })
        }
        else if (itemFormat == "album") {
          let resp = await fetch("https://api.spotify.com/v1/albums/"+itemId, this.requestOptionsGet);
          let albumData = await resp.json()
          this.spotifyData.unshift({
            type: "album",
            id: albumData.id,
            url: albumData.external_urls.spotify,
            track: null,
            data: albumData
          })
        }
        else if (itemFormat == "playlist") {
          let resp = await fetch("https://api.spotify.com/v1/playlists/"+itemId, this.requestOptionsGet);
          let playlistData = await resp.json()
          this.spotifyData.unshift({
            type: "playlist",
            id: playlistData.id,
            url: playlistData.external_urls.spotify,
            track: null,
            data: playlistData
          })
        }
        else {
          this.spotifyData.unshift({
            type: null,
            id: null,
            url: null,
            track: null,
            data: null,
          })
        }
        console.log(this.spotifyData)
        this.$store.commit('spotifyData', this.spotifyData)
      },
      async getSpotifyAlbum(id) {
        // GET playlist data using token
        let resp = await fetch("https://api.spotify.com/v1/albums/"+id, this.requestOptionsGet);
        let data = await resp.json()
        return data
      },
      play(spPreviewUrl) {
        if (spPreviewUrl == null) {
          this.player == null;
        } else if (this.player == null) {
          this.playingUrl = spPreviewUrl;
          this.player = new Audio(spPreviewUrl);
          this.player.volume = 0.35;
          this.player.play();
          this.isPlaying = true;
        } else if (this.playingUrl != spPreviewUrl) {
          this.player.pause();
          this.isPlaying = false;
          this.playingUrl = spPreviewUrl;
          this.player = new Audio(spPreviewUrl);
          this.player.volume = 0.35;
          this.player.play();
          this.isPlaying = true;
        } else if (this.isPlaying == false) {
          this.player.play();
          this.isPlaying = true;
        } else {
          this.player.pause();
          this.isPlaying = false;
        }
      },
    },
  }
</script>

<style scoped>

</style>