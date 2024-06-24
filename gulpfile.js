import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

import terser from "gulp-terser";

import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";

export function js(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js")) // Concatenar todos los archivos JavaScript en uno solo, este lo puedes nombrar como quieras ej: app.js
        .pipe(rename({ basename: "bundle.min" })) // Renombrar el archivo JavaScript a bundle.min.js
        .pipe(terser())
        .pipe(dest("build/js"))
        .pipe(rename({ extname: ".map" })) // Renombrar el archivo de mapa a bundle.min.js.map
        .pipe(dest("./build/js"));

    done();
}

export function css(done) {
    src("src/scss/app.scss", { sourcemaps: true })
        .pipe(
            sass({
                outputStyle: "compressed",
            }).on("error", sass.logError)
        )
        .pipe(dest("build/css", { sourcemaps: "." }));

    done();
}

export function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", js);
}

export default series(js, css, dev);
