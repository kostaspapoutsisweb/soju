<template>
  <div class="mx-auto w-full md:w-3/4">

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
                <a :href="sitem.url">
                  <button class="bg-spotifygreen hover:bg-spotifygreen-darker rounded-pill font-semibold p-t1 xs:px-t2 xs:py-t05 shadow hoverscale">
                    <v-icon
                      medium
                      color="white"
                    >
                      mdi-spotify
                    </v-icon>
                    <span class="hidden xs:inline-block text-sm pl-t1 text-white">Play</span>
                  </button>
                </a>
              </div>
              <div>

                  <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2"
                    v-if="sitem.type == 'playlist'"
                  >
                    <div class="flex pb-t1 hoverscale cursor-pointer"
                      v-for="strack in sitem.data.tracks.items"
                      :key="strack.id"
                      @click="play(strack.track.preview_url)">
                      <div class="w-6 sm:w-8 md:w-6 lg:w-8 flex-none">
                        <v-icon small v-if="strack.track.preview_url == null">mdi-music-note-off</v-icon>
                        <v-icon small v-else-if="playingUrl == strack.track.preview_url && isPlaying == true">mdi-pause</v-icon>
                        <v-icon small v-else>mdi-play</v-icon>
                      </div>
                      <div class="flex-grow overflow-hidden">
                        <p class="text-sm xs:text-base p-0 mb-1 leading-5" :title="strack.track.name">{{strack.track.name}}</p>
                        <p class="text-gray-500 text-xs xs:text-sm leading-4 p-0 mb-0" :title="formatArtists(strack.track.artists)">{{ formatArtists(strack.track.artists) }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2"
                    v-else
                  >
                    <div class="flex pb-t1 hoverscale cursor-pointer"
                      :class="{ 'bg-teal-900 p-2 rounded' : sitem.track == strack.id }"
                      v-for="strack in sitem.data.tracks.items"
                      :key="strack.id"
                      @click="play(strack.preview_url)">
                      <div class="w-6 sm:w-8 md:w-6 lg:w-8 flex-none">
                        <v-icon small v-if="strack.preview_url == null">mdi-music-note-off</v-icon>
                        <v-icon small v-else-if="playingUrl == strack.preview_url && isPlaying == true">mdi-pause</v-icon>
                        <v-icon small v-else>mdi-play</v-icon>
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
        access_token: '',
        url: "",
        spotifyData: [],
      }
    },
    async created() {
      const responsePost = await fetch("/.netlify/functions/getSpotifyToken");
      const dataPost = await responsePost.json();
      this.access_token = dataPost.access_token;
      this.requestOptionsGet = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + dataPost.access_token }
      };

      // If there is ?url= parameter, directly put into field and run
      if (this.$route.query.play) {
        this.url = this.$route.query.play
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

        let formatFinder = /(?<=com\/)\w+(?=\/)/m;
        let formatResults;
        if ((formatResults = formatFinder.exec(this.url)) !== null) {
          formatResults.forEach((formatRes) => {
            itemFormat = formatRes;
            console.log(itemFormat);
          });
        }

        let idFinder = /(?<=com\/\w+\/)\w+(?=\?|$)/m;
        let idResults;
        if ((idResults = idFinder.exec(this.url)) !== null) {
          idResults.forEach((idRes) => {
            itemId = idRes;
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
          this.player.volume = 0.4;
          this.player.play();
          this.isPlaying = true;
        } else if (this.playingUrl != spPreviewUrl) {
          this.player.pause();
          this.isPlaying = false;
          this.playingUrl = spPreviewUrl;
          this.player = new Audio(spPreviewUrl);
          this.player.volume = 0.4;
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