# 500px-browser

A web app that queries the 500px public API for popular pictures.

Built with __React/Redux__ on the front-end and a __Node/Express__ API with [Passport](http://passportjs.org/) (specifically [passport-500px](https://github.com/jeremybenaim/passport-500px)) for OAuth authentication.

I used React because I love working with Javascript and enjoy building components that are highly reusable. Also, being able to write Javascript and HTML in the same file makes DOM manipulation so much easier to manage and follow!

I used Node/Express for the back-end as I wanted a light weight server and was able to leverage my Javascript knowledge.

## Using this app

To run this app, first, please read the section below regarding __CONSUMER_KEY__ & __CONSUMER_SECRET__ setup. After that, cd into `/server` and run `npm install`, then `npm start`. In a separate window cd into `/client`, run `npm install` and `npm start`.

Please note, if you are running this locally, you may have to disable CORS. There is a handy Chrome extension, [Allow-Control-Allow-Origin:*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) that makes toggling CORS very easy.

### 500PX CONSUMER_KEY & CONSUMER_SECRET

I have used the [dotenv](https://github.com/motdotla/dotenv) to add the CONSUMER_KEY & CONSUMER_SECRET variables to `process.env`.

To use this app, you must have your own key and secret (you can get them by going to your 500px account > My Settings > Applications > Register application).

Once you have a key and secret, follow these steps:

- Create a file named `.env` in the `/server` directory.
- In the `.env` file, use the following format:

```
CONSUMER_KEY=abc
CONSUMER_SECRET=123
```

Replace `abc` and `123` with the key and secret respectively you obtained above.
