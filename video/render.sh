#!/bin/bash
# Renders every composition into the website's public/video folder.
set -e
OUT=../site/public/video
npx remotion render src/index.ts Showreel $OUT/showreel.mp4 --codec=h264 --crf=22 --concurrency=8 --port=3917
ffmpeg -loglevel error -y -i $OUT/showreel.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart -an $OUT/showreel-720.mp4
npx remotion still src/index.ts Showreel $OUT/showreel-poster.jpg --frame=160 --image-format=jpeg --jpeg-quality=85 --port=3917
for c in FinanceLoop MarketingLoop ConsultingLoop; do
  n=$(echo $c | sed 's/Loop//' | tr '[:upper:]' '[:lower:]')
  npx remotion render src/index.ts $c $OUT/loop-$n.mp4 --codec=h264 --crf=23 --concurrency=8 --port=3917
  npx remotion still src/index.ts $c $OUT/loop-$n.jpg --frame=0 --image-format=jpeg --jpeg-quality=85 --port=3917
done
ls -la $OUT
