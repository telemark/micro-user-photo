[![Build Status](https://travis-ci.org/telemark/micro-user-photo.svg?branch=master)](https://travis-ci.org/telemark/micro-user-photo)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-user-photo

## GET /

Returns this readme

## GET /user/:user

Returns json of user

```json
{
  "_id:": "5a0eaba8f1317311c5567268",
  "username": "0103grgr",
  "file": "ErkJggg==",
  "url": "https://file-njosybuecy.now.sh"
}
```

## GET /user/:user/img

Returns user photo in img-tag

## GET /user/:user/base64

Returns user photo in base64

## POST /user/:user

Deletes earlier photo if exists and uploads new. Must be png.

Set authorization header jwt

body:
```json
  {
    "file": "filebase64",
    "url": "url-to-image"
  }
```

## Curl post

```sh
IMG="$(cat photo.png | base64 -w0)"
echo '{ "file": "'"$IMG"'" }'
curl -H "Authorization: token123" -d '{ "file": "'"$IMG"'" }' https://photos.service.url/user/username
```

## Development

Add a local `.env` file

```
NODE_ENV=development
DB_SERVER=micro-user-photo-db-server
DB_COLLECTION=micro-user-photo-db-collection
DB_NAME=micro-user-photo-db-name
SYSTEM_JWT_SECRET=system-jwt
PAPERTRAIL_HOSTNAME=userphotos
PAPERTRAIL_HOST=papertrail-host
PAPERTRAIL_PORT=papertrail-port
```

Start the dev environment

```
$ now dev
```



## License

[MIT](LICENSE)
