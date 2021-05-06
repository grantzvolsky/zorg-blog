# 1. create droplet X=zorg-blog-prod-do-nyc1-droplet-1
# 2. ssh to X as root and run

useradd -ms /bin/bash -p "$6$LKS8KdXrDoNgb1D1$Qbks3fNaii1To5aNDl8pEhkRvXtu.rgBJUMUQF8PygCgiCP.DFqkNa5QNRrtkblvX0Aqp.6wvFRU1DMTeOs3X." blog
usermod -aG sudo blog
passwd -d blog
echo '#/bin/bash\nexport USER=$(whoami)' > /etc/profile.d/env-user.sh

ufw allow OpenSSH
ufw enable

cp -a /root/.ssh /home/blog/.ssh
chown blog -R /home/blog/.ssh
chgrp blog -R /home/blog/.ssh

# 3. ssh to X as user blog and run
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx Full'

# 4. disconnect from ssh and connect to the interactive docker image
# 5. create a tar bundle
npm run-script build
tar -cvf spa.tar spa/build

# 6. copy the tar bundle to droplet X
scp ./spa.tar blog@X:~/spa.tar
ssh blog@X
tar -xvf spa.tar
sudo chown -R $USER:$USER /var/www/html
rm /var/www/html/index.nginx-debian.html
tar -xvf spa.tar --directory /var/www/html
mv /var/www/html/spa/build/* /var/www/html
rm -rf /var/www/html/spa

# 7. point the A and CNAME records for zvolsky.org to X
# 8. ensure that nginx serves the index on all paths that don't match anything else
sudo sed -i 's/try_files\ \$uri\ \$uri\/\ =404/try_files\ \$uri\ \/index.html/g' /etc/nginx/sites-available/default

# 9. configure certbot
# https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d zvolsky.org
sudo certbot --nginx -d en.zvolsky.org
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl status certbot.timer
sudo certbot renew --dry-run

# 10. Finally declutter the nginx config.
cat > nginx.conf <<'EOF'
server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name zvolsky.org; # managed by Certbot

    location / {
        try_files $uri /index.html;
    }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/zvolsky.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/zvolsky.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
    if ($host = zvolsky.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name zvolsky.org;
    return 404; # managed by Certbot
}
server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name en.zvolsky.org; # managed by Certbot

    location / {
        return 301 https://zvolsky.org$request_uri;
    }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/en.zvolsky.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/en.zvolsky.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = en.zvolsky.org) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name en.zvolsky.org;
    return 404; # managed by Certbot
}
EOF
