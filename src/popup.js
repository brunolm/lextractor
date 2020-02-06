const g = (id) => document.getElementById(id)

function load() {
  const key = localStorage.getItem('key')

  if (!key) {
    return
  }

  const script = document.createElement('script')

  script.src = `https://api.trello.com/1/client.js?key=${key}`
  script.onload = () => {
    Trello.authorize({
      name: 'Add to Trello',
      expiration: 'never',
      scope: { read: true, write: true, account: false },
      success: () => {
        /* noop */
      },
      error: (err) => {
        console.error(err)
        alert(err)
      },
    })
  }

  document.head.appendChild(script)
}

function add() {
  g('card').innerText = 'Loading...'

  chrome.tabs.executeScript(
    null,
    {
      file: 'src/get-linkedin-info.js',
    },
    function() {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError)
      }
    },
  )
}

async function addCard(data) {
  console.log('data', data)

  return new Promise((resolve, reject) => {
    Trello.post(
      '/cards',
      {
        name: `[LinkedIn] ${data.name}`,
        desc: JSON.stringify(data),
        pos: 'top',
        idList: localStorage.getItem('list'),
      },
      (x) => {
        resolve(x)
      },
      (err) => {
        reject(err)
      },
    )
  })
}

chrome.runtime.onMessage.addListener(async (request, sender) => {
  if (request.action === 'done') {
    const { data } = request
    const user = JSON.parse(data)
    const { url } = await addCard(user)

    g('card').href = url
    g('card').innerText = user.name
  }
})

load()

document.addEventListener('DOMContentLoaded', () => {
  g('add').addEventListener('click', add)
})
