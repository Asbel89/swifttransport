import { readdirSync, copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const distAssets = join(process.cwd(), 'dist', 'assets')
const targetDir = join(process.cwd(), 'assets')

if (!existsSync(distAssets)) {
  console.log('dist/assets não existe ainda, rode vite build primeiro')
  process.exit(0)
}
if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })

const files = readdirSync(distAssets)
const css = files.find(f => f.startsWith('index-') && f.endsWith('.css'))
if (!css) {
  console.error('CSS compilado não encontrado em dist/assets')
  process.exit(1)
}
const src = join(distAssets, css)
const dest = join(targetDir, 'fallback.css')
copyFileSync(src, dest)
console.log(`✓ fallback atualizado: ${css} -> assets/fallback.css`)

// Também garante que dist/assets/fallback.css exista (para preview)
const distFallback = join(distAssets, 'fallback.css')
if (!existsSync(distFallback)) {
  copyFileSync(src, distFallback)
  console.log(`✓ fallback também copiado para dist/assets/fallback.css`)
}
