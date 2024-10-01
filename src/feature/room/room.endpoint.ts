export const ROOM_ENDPOINT = {
  detail: `${import.meta.env.VITE_APP_API}/rooms/get-room`,
  delete: `${import.meta.env.VITE_APP_API}/rooms/delete-room`,
  toggleStatus: `${import.meta.env.VITE_APP_API}/rooms/activate-or-block-room`,
  archive: `${import.meta.env.VITE_APP_API}/rooms/archive-room`,
  restore: `${import.meta.env.VITE_APP_API}/rooms/restore-room`,
  archivedList: `${import.meta.env.VITE_APP_API}/rooms/get-archived-rooms`,
  archivedRoom: `${import.meta.env.VITE_APP_API}/rooms/get-archived-room`,
  list: `${import.meta.env.VITE_APP_API}/rooms/get-rooms`,
  create: `${import.meta.env.VITE_APP_API}/rooms/create-room`,
  update: `${import.meta.env.VITE_APP_API}/rooms/update-room`,
};
