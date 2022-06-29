#!/bin/bash

set -e

cd $GITHUB_WORKSPACE

yarn run docs

REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
CURRENT_BRANCH=`awk -F/ '{print $NF}' <<< $GITHUB_REF`

TARGET_BRANCH="docs"
git clone $REPO out -b $TARGET_BRANCH

rm -rf out/docs
mv docs out

cd out
git add .
git config user.name "CesiumLabsBot"
git config user.email "103743930+CesiumLabsBot@users.noreply.github.com"
git config user.password $GITHUB_TOKEN
git commit -m "🚀 Build docs for ${CURRENT_BRANCH}: ${GITHUB_SHA}" || true
git push origin $TARGET_BRANCH

cd ..
rm -rf out
