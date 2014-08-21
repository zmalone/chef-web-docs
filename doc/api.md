# An Imaginary API for a Chef Lab Client

## GET /machines/:user_id/:machine_type

If it does not exist, responds with a 404.

If it does exist, responds with a 200.

If it's not ready yet:

```json
{
  "type": ":machine_type",
  "status": "waiting"
}
```

If it is ready:

```json
{
  "type": ":machine_type",
  "status": "ready",
  "user": "user",
  "password": "pass",
  "address": "host", // or IP? whatever
  "expires": "2014...", // an ISO date
  "rdpFileUrl": "http://address/of/rdp/file.rdp" // for windows servers
}
```

If there is an error:

```json
{
  "type": ":machine_type",
  "status": "error",
  "message": "A useful error message"
}
```

## POST /machines

Takes some data:

```json
{
  "user_id": "my-user-id",
  "type": "ubuntu-chefdk"
}
```

Responds with a 202 accepted and a Location header where the machine will be.

The response body:

```json
{
  "type": ":machine_type",
  "status": "waiting",
}
```
