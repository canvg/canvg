---
slug: /docs/migration-to-v4
description: canvg migration guide to v4
---

# Migration to v4

With v4, this library introduces a few small but breaking changes, so migration from v3 should be deadly easy.

## New exports

Default export was renamed to `Canvg`

```jsx title="v3"
import Canvg, { presets } from 'canvg';
```

```jsx title="v4"
import { Canvg, presets } from 'canvg';
```


## TypeScript 4

Starting from canvg v4, you should use TypeScript 4.
