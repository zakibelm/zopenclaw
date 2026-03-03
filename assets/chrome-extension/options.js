const DEFAULT_RELAY_URL = 'http://127.0.0.1:18791/'

function setStatus(kind, message) {
  const status = document.getElementById('status')
  if (!status) return
  status.dataset.kind = kind || ''
  status.textContent = message || ''
}

async function checkRelayReachable(url) {
  const checkUrl = url.replace(/\/$/, '') + '/'
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 2000)
  try {
    const res = await fetch(checkUrl, { method: 'HEAD', signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    setStatus('ok', `Relay reachable at ${checkUrl}`)
  } catch (err) {
    setStatus(
      'error',
      `Relay not reachable at ${checkUrl}. Error: ${String(err)}`,
    )
  } finally {
    clearTimeout(t)
  }
}

async function load() {
  const stored = await chrome.storage.local.get(['relayUrl'])
  const url = (stored.relayUrl || DEFAULT_RELAY_URL).trim()
  document.getElementById('relay-url-input').value = url
  await checkRelayReachable(url)
}

async function save() {
  const input = document.getElementById('relay-url-input')
  const url = input.value.trim() || DEFAULT_RELAY_URL
  await chrome.storage.local.set({ relayUrl: url })
  input.value = url
  await checkRelayReachable(url)
}

document.getElementById('save').addEventListener('click', () => void save())
void load()
