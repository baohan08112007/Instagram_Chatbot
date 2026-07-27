/**
 * localStorage-based conversation persistence.
 *
 * Each conversation stored under its own key: `ig_chat_<convId>`
 * localStorage gives ~5-10MB per origin (vs. cookies' ~4KB), so full
 * history is kept — no message-count trimming needed.
 *
 * Also stores conversation list metadata in `ig_chat_list`.
 */

const STORAGE_PREFIX = 'ig_chat_'
const STORAGE_LIST_KEY = 'ig_chat_list'

/**
 * Save conversation messages to localStorage.
 * @param {string} convId
 * @param {Array<{id: string, text: string, from: string, time: string}>} messages
 */
export function saveConversation(convId, messages) {
  if (!convId) return
  try {
    localStorage.setItem(STORAGE_PREFIX + convId, JSON.stringify(messages))
    updateConversationList(convId, messages)
  } catch (error) {
    console.error('Failed to save conversation to localStorage:', error)
  }
}

/**
 * Load conversation messages from localStorage.
 * @param {string} convId
 * @returns {Array|null} Messages array or null if not found
 */
export function loadConversation(convId) {
  if (!convId) return null
  const raw = localStorage.getItem(STORAGE_PREFIX + convId)
  if (!raw) return null
  try {
    const data = JSON.parse(raw)
    if (Array.isArray(data) && data.length > 0) return data
  } catch {
    // Corrupted entry — clean up
    localStorage.removeItem(STORAGE_PREFIX + convId)
  }
  return null
}

/**
 * Delete a conversation from localStorage.
 */
export function deleteConversation(convId) {
  if (!convId) return
  localStorage.removeItem(STORAGE_PREFIX + convId)
  removeFromConversationList(convId)
}

/**
 * Save last message preview + unseen status to conversation list entry.
 */
function updateConversationList(convId, messages) {
  const list = getConversationList() || {}
  if (messages && messages.length > 0) {
    const last = messages[messages.length - 1]
    list[convId] = {
      lastMessage: last.text?.slice(0, 80) || '',
      lastTime: last.time || '',
      messageCount: messages.length,
      updatedAt: Date.now(),
    }
  }
  localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(list))
}

function removeFromConversationList(convId) {
  const list = getConversationList() || {}
  delete list[convId]
  localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(list))
}

/**
 * Get conversation list metadata from localStorage.
 * @returns {Object|null} { [convId]: { lastMessage, lastTime, messageCount, updatedAt } }
 */
export function getConversationList() {
  const raw = localStorage.getItem(STORAGE_LIST_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(STORAGE_LIST_KEY)
    return null
  }
}

/**
 * Check if a conversation has saved data in localStorage.
 */
export function hasSavedConversation(convId) {
  return !!localStorage.getItem(STORAGE_PREFIX + convId)
}

/**
 * Clear all chat data from localStorage.
 */
export function clearAllConversations() {
  const list = getConversationList()
  if (list) {
    Object.keys(list).forEach((id) => localStorage.removeItem(STORAGE_PREFIX + id))
  }
  localStorage.removeItem(STORAGE_LIST_KEY)
}
