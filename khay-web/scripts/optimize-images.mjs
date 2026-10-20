import { mkdtempSync, readdirSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = fileURLToPath(new URL('../public/images/', import.meta.url))

function convert(source, destination, options = []) {
  execFileSync('cwebp', ['-quiet', '-q', '74', ...options, source, '-o', destination])
  console.log(`${destination.replace(root, '')}: ${Math.round(statSync(destination).size / 1024)} KB`)
}

for (const directory of ['brownis', 'review']) {
  for (const filename of readdirSync(join(root, directory)).filter(name => name.endsWith('.jpeg'))) {
    const source = join(root, directory, filename)
    const destination = source.replace(/\.jpeg$/, '.webp')
    if (directory === 'brownis') {
      const width = filename === 'brownis_box_l.jpeg' ? 1183 : 900
      const size = Math.min(width, 960)
      const crop = ['-crop', '0', String(Math.floor((1600 - width) / 2)), String(width), String(width)]
      // Product galleries already show a centered square; avoid shipping the cropped-out pixels.
      convert(source, destination, [...crop, '-resize', String(size), String(size)])
      convert(source, destination.replace('.webp', '-480.webp'), [...crop, '-resize', '480', '480'])
    } else {
      convert(source, destination)
    }
  }
}

convert(join(root, 'logo.jpeg'), join(root, 'logo-128.webp'), ['-resize', '128', '128'])
const temporary = mkdtempSync(join(tmpdir(), 'khay-images-'))
for (const size of [440, 760]) {
  // Match the centered square crop used by the hero's object-fit: cover.
  convert(join(root, 'brownis/brownis_box_l.jpeg'), resolve(root, `hero-${size}.webp`), [
    '-crop', '0', '208', '1183', '1183', '-resize', String(size), String(size),
    '-q', '64',
  ])
  const png = join(temporary, `hero-${size}.png`)
  execFileSync('sips', ['--setProperty', 'format', 'png', '--cropToHeightWidth', '1183', '1183', join(root, 'brownis/brownis_box_l.jpeg'), '--out', png])
  execFileSync('sips', ['--resampleHeightWidth', String(size), String(size), png])
  execFileSync('avifenc', ['-q', '40', '-s', '6', '-j', '2', png, join(root, `hero-${size}.avif`)])
  console.log(`hero-${size}.avif: ${Math.round(statSync(join(root, `hero-${size}.avif`)).size / 1024)} KB`)
}
