#!/usr/bin/env zx


const writer = async arr => {
  let temp = {}
  const list = []

  for (const url of arr) {
    if (/^\.*\//.test(url)) {
      list.push(temp = {
        file: path.resolve(url),
        contents: [],
        content: ''
      })
      continue
    }

    if (temp.contents) {
      temp.contents.push(url)
    }
  }

  for (const temp of list) {
    temp.content = await updater(temp.contents)
  }

  for (const temp of list) {
    fs.ensureFileSync(temp.file)
    fs.writeFile(temp.file, temp.content)
  }
}

const updater = async arr => {
  const templates = []
  const datetime = new Date().toUTCString()

  templates.push(`# Update time: ${datetime}\n`)

  for (const url of arr) {
    if (url) {
      const ip = await nslookup(url)
      const dns = `${ip}\t\t${url}`

      if (ip) {
        templates.push(dns)
      }
    }
  }

  return templates.join('\n')
}

const nslookup = async url => {
  try {
    const regex = new RegExp(`.*Name:\\s*${url}\\s*Address:\\s*([0-9.]+)\\s*.*`, 'ims')
    const stdout = (await $ `nslookup ${url}`).stdout
    return stdout.replace(regex, '$1')
  } catch {
    return ''
  }
}

writer([
  './public/host.txt',
  'github.com',
  'github.io'
])
