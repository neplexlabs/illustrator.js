#!/bin/bash

set -e

cd $GITHUB_WORKSPACE

yarn run docs

REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
BRANCH_OR_TAG=`awk -F/ '{print $2}' <<< $GITHUB_REF`
CURRENT_BRANCH=`awk -F/ '{print $NF}' <<< $GITHUB_REF`

if [ "$BRANCH_OR_TAG" == "heads" ]; then
  SOURCE_TYPE="branch"
else
  SOURCE_TYPE="tag"
fi

TARGET_BRANCH="docs"
git clone $REPO out -b $TARGET_BRANCH

mv docs/docs.json out/$CURRENT_BRANCH.json

cd out
git add .
git config user.name "CesiumLabsBot"
git config user.email "103743930+CesiumLabsBot@users.noreply.github.com"
git config user.password $GITHUB_TOKEN
git commit -m "🚀 Build docs for ${SOURCE_TYPE} ${CURRENT_BRANCH}: ${GITHUB_SHA}" || true
git push origin $TARGET_BRANCH

cd ..
rm -rf out
