#!/bin/bash

set -e

NODE_ENV=development pnpm build
cp -R test/browser/ website/build/demo/
cp -R test/svgs/ website/build/svgs/
cp dist/umd.js website/build/demo/
HTML=$(cat website/build/demo/index.html)
DEMO_HTML="${HTML/.\/..\/dist/}"
echo $DEMO_HTML > website/build/demo/index.html
