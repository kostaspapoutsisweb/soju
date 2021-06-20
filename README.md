![Soju logo](/public/media/android-chrome-192x192.png)

# Soju for Spotify 🎶

Soju lets you play music samples/listen to song previews from Spotify on any device -- no downloading apps, no trackers, and fast load times.

<https://playsoju.netlify.app>

*Built using Vite, Vue 3, and Tailwind CSS using Spotify Web API.*

<br />

## How to Use

**Simply [visit the website](#instances) and enter a Spotify link.**

To get a direct link, you can also add the url to a `?s=` query parameter like so:

```
https://playsoju.netlify.app/?s=SPOTIFYLINKHERE
```

Here's a list of query parameters. Many of these can be strung together using `?s=str&sm=str&method=str`.

|Query|Type|Description|
|:---|:---|:---|
|?s=|str|Jump straight to processing a Spotify url|
|?sa=|bool|Run all processing methods for an `?s=` url<br>*see `?method=` for more info*|
|?sm=|str|Processing method for an `?s=` url<br>*see `?method=` for more info*|
|?method=|str|Set default processing method for the browsing session<br><ul><li>**api** *(default)*: Uses Spotify Web API to retrieve media</li><li>**embed**: Uses official Spotify media embed (fallback)</li></ul>|

<br />

## Instances

Soju runs on Netlify Functions, which is ratelimited. If the main website isn't working, try another instance below:

|Site|Official|
|:---|:---|
|<https://playsoju.netlify.app>|✅|

<br />

## Self-Host

Soju is free, open source, and self-hostable. If you want to host your own Soju instance with your own Spotify API keys, it is ridiculously easy.

1. Click "Fork" on the top right corner
2. Go to Netlify (create an account if you haven't) and deploy the site
3. Under Build settings > Environment variables, add the variables listed in `.env.example` (your Spotify tokens go here)
4. Re-deploy your site

The way Soju works is that, on page load, a Spotify auth token is retrieved using your Spotify API Key via Netlify Functions and cached in the user device's Vuex store. The Spotify auth token expires after an hour, and Spotify ratelimits users using this auth token.

Soju works on the free Netlify tier, which offers a generous free tier of Netlify Functions.
