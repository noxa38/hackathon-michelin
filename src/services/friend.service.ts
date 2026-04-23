import type { FriendListItem, FriendPublicProfile, FriendRequestItem, FriendSearchResult } from '../types/friend.types'

const API_BASE = '/api/friends'

export async function searchUsers(token: string, query: string): Promise<FriendSearchResult[]> {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to search users')
  return response.json()
}

export async function addFriend(token: string, friendId: number): Promise<{ message: string; status: 'requested' | 'accepted' | 'already_requested' | 'already_friend' }> {
  const response = await fetch(`${API_BASE}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendId }),
  })
  if (!response.ok) throw new Error('Failed to add friend')
  return response.json()
}

export async function getIncomingFriendRequests(token: string): Promise<FriendRequestItem[]> {
  const response = await fetch(`${API_BASE}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch incoming friend requests')
  return response.json()
}

export async function respondToFriendRequest(
  token: string,
  requestId: number,
  action: 'accept' | 'reject',
): Promise<void> {
  const response = await fetch(`${API_BASE}/requests/${requestId}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  })
  if (!response.ok) throw new Error('Failed to respond to friend request')
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
