
---

# Reverse Proxy Example

This project consists of two servers where one server sends requests with specific headers and payloads, and these requests are reverse proxied to another server using Nginx.

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:priyanshusinha11/reverse-proxy.git
```

### Prerequisites

Before starting the servers, ensure you have the following installed:

- Node.js
- Nginx

### Start the Servers

Start the two servers by running the following commands in separate terminals:

```bash
node server1.js
```

```bash
node server2.js
```

### Configure Nginx

Modify the Nginx configuration file, typically located in `/etc/nginx/nginx.conf`, by adding the following server block:

```nginx
# nginx.conf

# Specify events block
events {
    worker_connections 1024;
}

# Define HTTP block
http {
    # Set MIME types
    include       mime.types;
    default_type  application/octet-stream;

    # Define server block
    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://localhost:8081;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_buffering off;
            client_max_body_size 0;
            proxy_connect_timeout 3600;
            proxy_send_timeout 3600;
            proxy_read_timeout 3600;
            send_timeout 3600;
        }
    }
}
```

### Restart Nginx

After modifying the configuration file, restart Nginx to apply the changes:

```bash
sudo systemctl reload nginx
```

## Sending a POST Request

To send a POST request to the proxy server, use the following `curl` command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://localhost:8081/proxy
```

This will send a request with a JSON payload to the proxy server, which will then be forwarded to the target server.

---

