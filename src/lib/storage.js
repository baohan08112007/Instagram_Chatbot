/**
 * Cookie-based conversation persistence.
 *
 * Cookies store serialized messages so chat history survives page refresh.
 * Each conversation stored in a separate cookie: `ig_chat_<convId>`
 * Max 50 most recent messages per conversation to stay within ~4KB cookie limit.
 * Expires in 7 days.
 *
 * Also stores conversation list metadata in `ig_chat_list`.
 */

const COOKIE_PREFIX = 'ig_chat_'
const COOKIE_LIST_KEY = 'ig_chat_list'
const MAX_MESSAGES = 50
const EXPIRE_DAYS = 7

/**
 * Set a cookie with expiration.
 */
function setCookieRaw(name, value, days = EXPIRE_DAYS) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

/**
 * Get a cookie by name.
 */
function getCookieRaw(name) {
  const prefix = `${encodeURIComponent(name)}=`
  for (const c of document.cookie.split('; ')) {
    if (c.startsWith(prefix)) {
      return decodeURIComponent(c.slice(prefix.length))
    }
  }
  return null
}

/**
 * Delete a cookie.
 */
function deleteCookieRaw(name) {
  document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

/**
 * Save conversation messages to cookie.
 * @param {string} convId
 * @param {Array<{id: string, text: string, from: string, time: string}>} messages
 */
export function saveConversation(convId, messages) {
  if (!convId) return

  // Only keep last N messages to stay under cookie size limit
  const trimmed = messages.slice(-MAX_MESSAGES)

  // Estimate size. If too large, trim further
  let payload = JSON.stringify(trimmed)
  let limit = MAX_MESSAGES
  while (payload.length > 3500 && limit > 5) {
    limit = Math.floor(limit / 2)
    payload = JSON.stringify(trimmed.slice(-limit))
  }

  setCookieRaw(COOKIE_PREFIX + convId, payload, EXPIRE_DAYS)
  updateConversationList(convId)
}

/**
 * Load conversation messages from cookie.
 * @param {string} convId
 * @returns {Array|null} Messages array or null if not found
 */
export function loadConversation(convId) {
  if (!convId) return null
  const raw = getCookieRaw(COOKIE_PREFIX + convId)
  if (!raw) return null
  try {
    const data = JSON.parse(raw)
    if (Array.isArray(data) && data.length > 0) return data
  } catch {
    // Corrupted cookie — clean up
    deleteCookieRaw(COOKIE_PREFIX + convId)
  }
  return null
}

/**
 * Delete a conversation from cookies.
 */
export function deleteConversation(convId) {
  if (!convId) return
  deleteCookieRaw(COOKIE_PREFIX + convId)
  removeFromConversationList(convId)
}

/**
 * Save last message preview + unseen status to conversation list cookie.
 */
function updateConversationList(convId) {
  const list = getConversationList() || {}
  const messages = loadConversation(convId)
  if (messages && messages.length > 0) {
    const last = messages[messages.length - 1]
    list[convId] = {
      lastMessage: last.text?.slice(0, 80) || '',
      lastTime: last.time || '',
      messageCount: messages.length,
      updatedAt: Date.now(),
    }
  }
  setCookieRaw(COOKIE_LIST_KEY, JSON.stringify(list), EXPIRE_DAYS)
}

function removeFromConversationList(convId) {
  const list = getConversationList() || {}
  delete list[convId]
  setCookieRaw(COOKIE_LIST_KEY, JSON.stringify(list), EXPIRE_DAYS)
}

/**
 * Get conversation list metadata from cookie.
 * @returns {Object|null} { [convId]: { lastMessage, lastTime, messageCount, updatedAt } }
 */
export function getConversationList() {
  const raw = getCookieRaw(COOKIE_LIST_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    deleteCookieRaw(COOKIE_LIST_KEY)
    return null
  }
}

/**
 * Check if a conversation has saved data in cookies.
 */
export function hasSavedConversation(convId) {
  return !!getCookieRaw(COOKIE_PREFIX + convId)
}

/**
 * Clear all chat cookies.
 */
export function clearAllConversations() {
  const list = getConversationList()
  if (list) {
    Object.keys(list).forEach((id) => deleteCookieRaw(COOKIE_PREFIX + id))
  }
  deleteCookieRaw(COOKIE_LIST_KEY)
}
