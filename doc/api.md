# An Imaginary API for a Chef Lab Client

## GET /machines/:user_id/:machine_type

If it does not exist, responds with a 404.

If it does exist, responds with a 200.

If it's not ready yet:

```json
{
  "requested_at": "2014...",
  "status": "waiting"
}
```

could also give `expired`, if it existed before and is no longer available.

If it is ready:

```json
{
  "requested_at": 2014...",
  "status": "ready",
  "username": "user",
  "password": "pass",
  "hostname": "host", // or IP? whatever
  "expires_at": 2014..."
}

## POST /machines

Takes some data:

{
  "user_id": "my-user-id",
  "type": "ubuntu-chefdk"
}

Responds with a 204 accepted and a Location header where the machine will be.

## PUT /machines/:user_id/:machine_type

Tells an expired machine to come back.

Responds with a 204 accepted and a Location header where the machine will be.
