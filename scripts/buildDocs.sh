#!/bin/bash

set -e

yarn build
set +e; typedoc ./src --out ./docs --ignoreCompilerErrors --excludeExternals --mode modules; set -e
touch docs/.nojekyll
cp -R test/browser/ docs/demo/
cp -R test/svgs/ docs/svgs/
cp lib/umd.js docs/demo/
HTML=$(cat docs/demo/index.html)
DEMO_HTML="${HTML/.\/..\/lib/}"
echo $DEMO_HTML > docs/demo/index.html
