# 500px-browser

A web app that queries the 500px public API for popular pictures.

Built in: ...


## CONSUMER_KEY & CONSUMER_SECRET

I have used the [dotenv](https://github.com/motdotla/dotenv) to add the CONSUMER_KEY & CONSUMER_SECRET variables to `process.env`.

To use this program, you must have your own key and secret (you can get them by going to your 500px account > My Settings > Applications > Register application).

Once you have a key and secret, follow these steps:

- Create a file named `.env` in the `/server` directory.
- In the `.env` file, use the following format:

```
CONSUMER_KEY=abc
CONSUMER_SECRET=123
```

Replace `abc` and `123` with the key and secret you obtained above.
