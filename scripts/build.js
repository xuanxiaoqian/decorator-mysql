const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')
const process = require('child_process')
const glob = require('glob')



function removeDir(filePath) {
  if (!fs.existsSync(path.resolve(filePath))) {
    fs.mkdirSync(filePath)
  }
  let statObj = fs.statSync(filePath)
  if (statObj.isDirectory()) {
    let dirs = fs.readdirSync(filePath)
    dirs = dirs.map((dir) => path.join(filePath, dir))
    for (let i = 0; i < dirs.length; i++) {
      removeDir(dirs[i])
    }
    fs.rmdirSync(filePath)
  } else {
    fs.unlinkSync(filePath)
  }
}

removeDir('./dist')

glob('src/**/*.ts', {}, function (er, files) {
  esbuild
    .build({
      entryPoints: files,
      bundle: false,
      outdir: 'dist',
      platform: 'node',
      format: 'cjs',
      target: 'node14',
      plugins: [],
    })
    .then(() => {
      process.exec('npx tsc --declaration -p ./ -t es2015 --emitDeclarationOnly --outDir dist/types', (error, stdout, stderr) => { })
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
})





