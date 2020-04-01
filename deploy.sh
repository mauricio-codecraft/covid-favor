#!/bin/bash
# Script to deploy front end application into s3 account (s3://codecraft-covid-favor)
# 
#
# Usage: ./deploy.sh file
# -----------------------------------------------------------------------------

# build the application
echo "Starting covid-favor build..."
ionic build
echo "covid-favor build completed"

cd ./www

# compressing files
echo "Starting to minify files..."
for f in *.js; do short=${f%.js}; terser $f > $short.min.js && rm $f && mv $short.min.js $f; done
echo "Minification is completed!"

# deploy to S3
echo "Starting covid-favor deployment to S3"
aws s3 cp . s3://codecraft-covid-favor --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
echo "covid-favor deployment to S3 completed!"

# creating invalidation
echo "Creating invalidation for website"
aws cloudfront create-invalidation --distribution-id E2URYH50YBZ9A1 --paths /*
echo "Invalidation request is completed!"
