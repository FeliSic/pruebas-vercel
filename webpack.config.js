const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  entry: "./frontend/index.tsx", // Punto de entrada
  output: {
    path: path.resolve(__dirname, "dist"), // Carpeta de salida
    filename: "bundle.js", // Nombre del archivo generado
    clean: true, // Limpia la carpeta dist en cada build
  },
  mode: "production", // Modo de producción
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Archivos JS/React
        exclude: /node_modules/, // Excluir node_modules
        use: {
          loader: "babel-loader", // Usar Babel
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Presets para JS moderno y React
          },
        },
      },
      {
        test: /\.css$/, // Archivos CSS
        use: ["style-loader", "css-loader"], // Cargar CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Archivos de imagen
        type: "asset/resource", // Manejar como recursos
      },
      {
        test: /\.(ts|tsx)$/i, // Archivos de ts/tsx
        use: "ts-loader", // Usar ts-loader
        exclude: /node_modules/, // Excluir node_modules
      },
    ],
  },
  stats: {
    children: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"], // Extensiones soportadas
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.frontend.json",
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/public/index.html", // Plantilla HTML
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
};

/*
# Desarrollo y Producción con Webpack

- En desarrollo usás `webpack-dev-server` con hot reload para ver los cambios al toque sin recargar manualmente.
- En producción, no usás hot reload ni servidor de desarrollo; servís los archivos estáticos ya buildiados desde `dist` con un servidor simple (como `http-server`).
- Resumen:
  - Dev: `webpack-dev-server` con hot reload para desarrollo rápido y cómodo.
  - Prod: Buildás con `webpack --mode production` y servís los archivos estáticos generados.

---

# Code Splitting con React.lazy y Suspense

**¿Qué es?**  
El code splitting permite dividir el código en chunks que se cargan de forma diferida, mejorando el rendimiento al reducir el tamaño del bundle inicial.

**¿Cómo se implementa?**

```js
const Button = React.lazy(() => import('./button'));
const Button2 = React.lazy(() => import('./button2'));

# Configuración Webpack para Code Splitting y HTML

plugins: [
  new HtmlWebpackPlugin({
    template: "./dist/index.html", // si tenés un index.html base
  }),
],
output: {
  path: path.resolve(__dirname, "dist"),
  filename: "[name].[contenthash].js", // nombre dinámico para evitar conflictos
},

  Esto permite que Webpack sirva los bundles con nombres que cambian tras cada build, evitando conflictos y asegurando que siempre se carguen los archivos correctos.
*/
