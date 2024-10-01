export const ACTIVITY_LOG_ENDPOINT = {
  detail: `${import.meta.env.VITE_APP_API}/activities/get-activity`,
  delete: `${import.meta.env.VITE_APP_API}/activities/delete-activity`,
  archive: `${import.meta.env.VITE_APP_API}/activities/archive-activity`,
  restore: `${import.meta.env.VITE_APP_API}/activities/restore-activity`,
  archivedList: `${
    import.meta.env.VITE_APP_API
  }/activities/get-archived-activities`,
  list: `${import.meta.env.VITE_APP_API}/activities/get-activities`,
};
