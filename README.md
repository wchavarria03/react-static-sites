# React Static Pages

# Setup
```
npm install
npm start ./src/BRAND/PAGE_TYPE/TYPE_NAME
npm run start:prod ./src/BRAND/PAGE_TYPE/TYPE_NAME
npm run build ./src/BRAND/PAGE_TYPE/TYPE_NAME
```

# Project Structure
```
staticpages
└── src
│    ├──pages
│    │    └── PAGE_TYPE (landing, others)
│    │        ├── TYPE_NAME (Control or Variants)
│    │        │    └── img
│    │        │    └── css
│    │        │    └── js
│    │        │    └── index.js (Webpack entry point)
│    │        │    └── index.html
│    │        └── components (PAGE_TYPE specific components)
│    ├── components
│    ├── images
│    ├── styles
│    └── utils (or shared assets)
└── config  
```


