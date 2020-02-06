const g = (id) => document.getElementById(id)
const gv = (id) => g(id).value
const gsv = (id, val) => (g(id).value = val)

function load() {
  const key = localStorage.getItem('key')
  const script = document.createElement('script')

  script.src = `https://api.trello.com/1/client.js?key=${key}`

  script.onload = onTrelloClientLoad

  document.head.appendChild(script)
}

function save() {
  const key = gv('key')
  const board = gv('board')
  const list = gv('list')

  localStorage.setItem('key', key)
  localStorage.setItem('board', board)
  localStorage.setItem('list', list)
}

async function onTrelloClientLoad() {
  await auth()

  const boards = await getBoards()
  popuplateSelect('board', boards)

  const board = localStorage.getItem('board')
  const list =  localStorage.getItem('list')

  const lists = await getLists(board)
  popuplateSelect('list', lists)

  gsv('board', board)
  gsv('list', list)
}

function popuplateSelect(elementId, list) {
  g(elementId).innerHTML = ''

  for (const { id, name } of list) {
    const option = document.createElement('option')
    option.value = id
    option.label = name
    g(elementId).appendChild(option)
  }
}

function auth() {
  return new Promise((resolve, reject) => {
    Trello.authorize({
      name: 'Add to Trello',
      expiration: 'never',
      scope: { read: true, write: true, account: false },
      success: () => {
        resolve()
      },
      error: (err) => {
        reject(err)
      },
    })
  })
}

function getBoards() {
  return new Promise((resolve, reject) => {
    window.Trello.get(
      '/members/me/boards',
      (boards) => {
        resolve(boards.filter((b) => !b.closed))
      },
      () => {},
    )
  })
}

function getLists(id) {
  return new Promise((resolve, reject) => {
    window.Trello.get(
      `/boards/${id}?lists=all`,
      ({ lists }) => {
        resolve(lists.filter((l) => !l.closed))
      },
      () => {},
    )
  })
}

document.addEventListener('DOMContentLoaded', () => {
  g('load').addEventListener('click', load)
  g('save').addEventListener('click', save)

  g('board').addEventListener('change', async () => {
    const lists = await getLists(g('board').value)
    popuplateSelect('list', lists)
  })

  gsv('key', localStorage.getItem('key'))
  gsv('board', localStorage.getItem('board'))
  gsv('list', localStorage.getItem('list'))

  load()
})
