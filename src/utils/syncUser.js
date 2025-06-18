// frontend/utils/syncUser.js
export async function syncClerkUser(token) {
  const res = await fetch('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log("✅ Synced user:", data.user);
  return data.user;
}
