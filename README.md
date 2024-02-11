# google-calendar-renderer

Fetches data from a public Google calendar and displays it in the browser.

**Setup**

1. Create keys.js

   ```
   echo "const CALENDAR_ID = 'PASTE'; const API_KEY = 'PASTE';" > keys.js
   ```

   - Create `API_KEY`: https://console.cloud.google.com/
   - Get `CALENDAR_ID`: https://calendar.google.com/

2. Install TypeScript: `npm install -g typescript`
3. Compile to JavaScript: `tsc` / `tsc --watch`
4. Open [index.html](index.html) in browser or serve with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
