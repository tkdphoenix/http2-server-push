# Using HTTP2

This is an experiment to see if I can get html pages to serve assets with an SSL certificate and http2

## Creating the SSL Certificate

```openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt```
Answer the questions as well as possible so that browsers will accept the certificate. Chrome will stil complain about encryption, but you can type `thisisunsafe` and the page will be visible.

Following this you will need to modify these files to be read only:
`chmod 400 server.key server.crt`