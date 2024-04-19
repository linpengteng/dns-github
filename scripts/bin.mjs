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

  templates.sort((next, prev) => {
    const nexts = next.split(/\s/)
    const prevs = prev.split(/\s/)
    return nexts[0].length < prevs[0].length ? -1 : 1
  })

  return templates.join('\n')
}

const nslookup = async url => {
  try {
    const regex = new RegExp(`.*Name:\\s*[\\S]+\\s*Address:\\s*([0-9.]+)\\s*.*`, 'ims')
    const stdout = (await $ `nslookup ${url}`).stdout
    return stdout.replace(regex, '$1')
  } catch {
    return ''
  }
}

writer([
  './public/host.txt',
  'pipelines.actions.githubusercontent.com',
  'user-images.githubusercontent.com',
  'favicons.githubusercontent.com',
  'desktop.githubusercontent.com',
  'objects.githubusercontent.com',
  'github.global.ssl.fastly.net',
  'media.githubusercontent.com',
  'cloud.githubusercontent.com',
  'camo.githubusercontent.com',
  'raw.githubusercontent.com',
  'github.githubassets.com',
  'github.map.fastly.net',
  'education.github.com',
  'collector.github.com',
  'codeload.github.com',
  'central.github.com',
  'githubstatus.com',
  'alive.github.com',
  'github.community',
  'live.github.com',
  'gist.github.com',
  'api.github.com',
  'github.blog',
  'github.com',
  'github.io',
  'vscode.dev'
])
