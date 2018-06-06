
Read more about ssh tunnels:
    https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html

usefull command to determine if it's working on target machine:
    netstat -ntpl
    
# ALLOW BINDING TO 0.0.0.0 ON THE SERVER

  [https://superuser.com/a/588665](https://superuser.com/a/588665)    

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

# cron

    * *   * * * root cd /var/www/html-scraper/ssh-tunnel && (make isworking || make start)