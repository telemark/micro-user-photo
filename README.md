[![Build Status](https://travis-ci.org/telemark/micro-user-photo.svg?branch=master)](https://travis-ci.org/telemark/micro-user-photo)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-user-photo.svg)](https://greenkeeper.io/)

# micro-user-photo

# GET /

Returns this readme

# GET /user/:user

Returns user photo in img-tag

# GET /user/:user/base64

Returns user photo in base64

# POST /user/:user

Deletes earlier photo if exists and uploads new. Must be png.

Set authorization header jwt

body:
```json
{ "username": "username", "file": "filebase64" }
```

## License

[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/micro-user-photo.png "Robohash image of micro-user-photo")