!/bin/sh
cd /Users/wusimin7/Documents/jd_code/node-blog/blog-node/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log