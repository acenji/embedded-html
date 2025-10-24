# ACENji Embedded HTML Plugin

ACENji’s embedded plugin connects ACENji apps to any existing or new HTML/JavaScript page, enabling full visual development and live updates from the ACENji platform.

---

## ✨ Features
- Drop-in `<script>` and `<link>` integration  
- Works in plain HTML or any framework  
- Local Express server for quick testing  
- Optional `/api` proxy for backend connections  
- SPA fallback for seamless dev flow  

---

## ⚙️ 1. Add ACENji to Any HTML Page

Insert this snippet where you want ACENji to appear on your site:

```html
<div id="acenji_root"></div>
<link rel="stylesheet" href="https://acenji.com/build_web_app/static/css/main.b6215c01.css">
<script src="https://acenji.com/build_web_app/static/js/main.js"></script>
<script>
  window.addEventListener('load', () => {
    const appId = 'your_actual_app_id'; // 👈 Replace this with your own App ID
    localStorage.setItem('web_app_id', appId);

    const rootElement = document.getElementById('acenji_root');
    const { React, ReactDOM, Provider, configureStore, default: App } = window.AppLibrary;

    const store = configureStore();
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(Provider, { store }, React.createElement(App))
      )
    );
  });
</script>
```

### 🧩 Placement

Add the <link> inside <head>.

Place <div id="acenji_root"></div> where you want ACENji to render.

Add both <script> tags just before </body>.

To connect ACENji to your HTML site:
After this line

```bash
<script src="https://acenji.com/build_web_app/static/js/main.js"></script>
```
simply replace
```bash
const appId = '780';
```
with your own App ID, and it will power up your page for the designated server port.

## 🧱 2. Local Development (Node server)
This repo includes a simple Express server for local testing.
Your structure should look like this:
```bash
embedded-html/
├─ public/
│  └─ index.html        # your working page (loads ACENji)
├─ server.js
├─ .env                 # optional (TARGET_API=...)
├─ package.json
└─ .gitignore
```
### Example public/index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ACENji Local Test</title>
  <link rel="stylesheet" href="https://acenji.com/build_web_app/static/css/main.b6215c01.css">
</head>
<body>
  <div id="root"></div>

  <script src="https://acenji.com/build_web_app/static/js/main.js"></script>
  <script>
    window.addEventListener('load', () => {
      const appId = '780'; // replace with your own ACENji app ID
      localStorage.setItem('web_app_id', appId);

      const rootElement = document.getElementById('root');
      const { React, ReactDOM, Provider, configureStore, default: App } = window.AppLibrary;

      const store = configureStore();
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        React.createElement(
          React.StrictMode,
          null,
          React.createElement(Provider, { store }, React.createElement(App))
        )
      );
    });
  </script>
</body>
</html>
```

Important: Your server.js serves public/index.html for all routes.
Make sure that file exists before running the server.

## 🚀 3. Install & Run Locally
```bash
# from repo root
npm init -y                            # if you don't have package.json yet
npm i express serve-static http-proxy-middleware dotenv

# Add these scripts to your package.json:
# "scripts": {
#   "start": "node server.js",
#   "dev": "NODE_ENV=development node server.js"
# }

npm run start
```
ou’ll see something like:
```bash
ACENji local server running: http://localhost:3000/test/free
No TARGET_API set. /api requests will 404 locally.
```

Open http://localhost:3000/test/free to view your page.
