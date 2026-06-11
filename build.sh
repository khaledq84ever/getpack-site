#!/bin/bash
# Rebuild all 4 extension zips from ~/projects, refresh this folder + ~/www/extensions,
# then deploy. Run after ANY extension code change.
set -e
cd /home/khaled/projects
for d in youtube-extension tweetget-extension instagram-extension tiktok-extension; do
  rm -f /home/khaled/www/extensions/$d.zip
  (cd $d && 7z a -tzip /home/khaled/www/extensions/$d.zip . -xr'!.git' -xr'!node_modules' -x'!STORES.md' >/dev/null)
  echo "$d.zip rebuilt"
done
cp /home/khaled/www/extensions/*.zip /home/khaled/projects/getpack-site/
cp /home/khaled/www/extensions/index.html /home/khaled/projects/getpack-site/index.html
cd /home/khaled/projects/getpack-site && railway up --ci --service getpack 2>&1 | tail -1
