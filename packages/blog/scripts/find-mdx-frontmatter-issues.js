#!/usr/bin/env node
// Scans content/posts/**/index.mdx for missing/invalid frontmatter, especially titles needing quotes.
const fs = require('fs')
const path = require('path')

// Script location: packages/blog/scripts
// Site content location (posts): ../../site/content/posts
const ROOT = path.join(__dirname, '..', '..', '..', 'site', 'content', 'posts')

function listMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...listMdxFiles(full))
    else if (e.isFile() && e.name.toLowerCase() === 'index.mdx') files.push(full)
  }
  return files
}

function needsQuoting(value) {
  // contains colon or leading/trailing spaces or unmatched quotes
  return /[:]/.test(value) || /^\s|\s$/.test(value) || /".*".*"/.test(value)
}

const REQUIRED = ['title', 'category', 'author', 'date', 'thumbnail']

function fixFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8')
  const parts = raw.split(/^---\s*$/m)
  if (parts.length < 3) return { file, ok: false, reason: 'missing frontmatter block' }

  const front = parts[1].split(/\r?\n/)
  const map = {}
  let changed = false
  const out = front.map(line => {
    if (!line.toLowerCase().startsWith('title:')) return line
    const [, rest] = line.split(/title:\s*/)
    if (!rest) return line
    const trimmed = rest.trim()
    // If already quoted, keep.
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return line
    }
    if (needsQuoting(trimmed)) {
      changed = true
      return `title: "${trimmed.replace(/"/g, '\\"')}"`
    }
    map.title = rest.trim()
    return line
  })

  // Track other fields
  front.forEach(line => {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (m) {
      map[m[1]] = m[2].trim()
    }
  })

  const missing = REQUIRED.filter(k => !map[k] || map[k].length === 0)
  if (missing.length && !changed) {
    return { file, ok: false, reason: `missing required: ${missing.join(', ')}` }
  }

  if (!changed) return { file, ok: true, changed: false }

  const rebuilt = ['---', ...out, '---', parts.slice(2).join('---')].join('\n')
  fs.writeFileSync(file, rebuilt)
  return { file, ok: true, changed: true }
}

const files = listMdxFiles(ROOT)
const results = files.map(fixFrontmatter)
const changed = results.filter(r => r.changed)
const failed = results.filter(r => r.ok === false)

console.log(`Scanned ${files.length} MDX files.`)
console.log(`Changed ${changed.length} files.`)
if (failed.length) {
  console.warn('Failed frontmatter:', failed)
}

process.exit(0)
