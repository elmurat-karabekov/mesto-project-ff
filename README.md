# Проектная работа Mesto

0. set/reset npm packages repo
```
npm set registry https://npm.prakticum-team.ru
npm login

npm set registry https://registry.npmjs.org/
```

1. ```npm init -y```

2. ```npm i -D webpack webpack-cli webpack-dev-server```

3. create webpack config file - ```webpack.config.js```

4. import ```path``` node module into webpack.config.js.
- __dirname - current dir reference

5. ```npm i -D @babel/core @babel/preset-env babel-loader``` - install Babel for transpilation + download one of many available preset rules for babel transpilation + babel loader for webpack

6. ```npm i core-js``` - polyfill. Solvels cases where new syntax cannot be just achieved with simple transpilation

7. create ```babel.config.js``` file

8. ```npm i -D html-webpack-plugin``` - tell webpack how to work with HTML files

9. ```npm i -D clean-webpack-plugin``` - clean dist/ on each build

10. images & css load as assets;

11. load Post css and two plugins for it:
```npm i -D postcss-loader autoprefixer cssnano```

12. create ```postcss.config.js``` file

13. ```npm i -D mini-css-extract-plugin```

