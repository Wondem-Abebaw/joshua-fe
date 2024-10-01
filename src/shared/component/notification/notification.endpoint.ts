export const NOTIFICATION_ENDPOINT = {
  detail: `${import.meta.env.VITE_APP_API}/notifications/get-notification`,
  delete: `${import.meta.env.VITE_APP_API}/notifications/delete-notification`,
  toggleStatus: `${
    import.meta.env.VITE_APP_API
  }/notifications/change-notification-status`,
  archive: `${import.meta.env.VITE_APP_API}/notifications/archive-notification`,
  restore: `${import.meta.env.VITE_APP_API}/notifications/restore-notification`,
  archivedList: `${
    import.meta.env.VITE_APP_API
  }/notifications/get-archived-notifications`,
  archivedNotification: `${
    import.meta.env.VITE_APP_API
  }/notifications/get-archived-notification`,
  list: `${import.meta.env.VITE_APP_API}/notifications/get-notifications`,
  create: `${import.meta.env.VITE_APP_API}/notifications/create-notification`,
  update: `${import.meta.env.VITE_APP_API}/notifications/update-notification`,
  updateProfile: `${
    import.meta.env.VITE_APP_API
  }/notifications/update-notification-profile-image/`,
};
