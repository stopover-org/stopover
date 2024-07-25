#!/bin/bash

# Ensure the certs directory exists
mkdir -p nginx/certs

# Generate the SSL certificate and key
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/selfsigned.key -out nginx/certs/selfsigned.crt \
  -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=localhost"

# Print a message to indicate the certificates were created successfully
echo "SSL certificates generated and stored in nginx/certs directory."
