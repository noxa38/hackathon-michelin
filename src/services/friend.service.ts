import type { FriendListItem, FriendPublicProfile, FriendSearchResult } from '../types/friend.types'

const API_BASE = '/api/friends'

export async function searchUsers(token: string, query: string): Promise<FriendSearchResult[]> {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to search users')
  return response.json()
}

export async function addFriend(token: string, friendId: number): Promise<void> {
  const response = await fetch(`${API_BASE}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendId }),
  })
  if (!response.ok) throw new Error('Failed to add friend')
}

export async function getFriends(token: string): Promise<FriendListItem[]> {
  const response = await fetch(`${API_BASE}/list`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch friends')
  return response.json()
}

export async function getFriendPublicProfile(token: string, friendId: number): Promise<FriendPublicProfile> {
  const response = await fetch(`${API_BASE}/${friendId}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch friend profile')
  return response.json()
}
