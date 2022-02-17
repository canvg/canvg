#!/bin/bash

set -e

NODE_ENV=development pnpm build
set +e; typedoc ./src --out ./docs --excludeExternals; set -e
touch docs/.nojekyll
cp -R test/browser/ docs/demo/
cp -R test/svgs/ docs/svgs/
cp dist/umd.js docs/demo/
HTML=$(cat docs/demo/index.html)
DEMO_HTML="${HTML/.\/..\/dist/}"
echo $DEMO_HTML > docs/demo/index.html
