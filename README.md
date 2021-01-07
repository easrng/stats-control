## Stats Control

Stats Control is a simple web component for analytics.

### Usage

To use Stats Control, import it.

```js
import beacon from "./stats.js";
beacon("event-name")
```

```html
<stats-control href="https://analytics-server/" site="site-name"></stats-control>
```

<script type="module">
import beacon from "https://easrng.github.io/stats-control/stats.js"
beacon("page-load")
</script>
<stats-control href="https://collect.easrng.workers.dev/" site="stats-control"></stats-control>
