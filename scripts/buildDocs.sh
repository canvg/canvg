#!/bin/bash

trigen-scripts build
trigen-scripts build:docs
cp -R test/browser/ docs/demo/
cp -R test/svgs/ docs/svgs/
cp lib/umd.js docs/demo/
HTML=$(cat docs/demo/index.html)
DEMO_HTML="${HTML/.\/..\/lib/}"
echo $DEMO_HTML > docs/demo/index.html
