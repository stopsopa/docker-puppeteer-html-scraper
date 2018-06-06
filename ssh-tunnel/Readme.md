
Read more about ssh tunnels:
    https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html

usefull command to determine if it's working on target machine:
    netstat -ntpl

# Usage

on mac run:
    /bin/bash tunnel.sh
        and run scraper server:
    make start

on target server (with static ip) run:
    node proxy-server.js

now open in browser <ip of server>:<NODEPORT>
it will redirect traffic to localhost:<TARGETHOSTPORT>
now through tunnel it will be redirected to Mac scraper service on port <LOCALPORT>