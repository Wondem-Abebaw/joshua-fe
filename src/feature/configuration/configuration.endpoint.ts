export const CONFIGURATION_ENDPOINT = {
  detail: `${import.meta.env.VITE_APP_API}/configurations/get-configuration`,
  delete: `${import.meta.env.VITE_APP_API}/configurations/delete-configuration`,
  toggleStatus: `${
    import.meta.env.VITE_APP_API
  }/configurations/activate-or-block-configuration`,
  archive: `${
    import.meta.env.VITE_APP_API
  }/configurations/archive-configuration`,
  restore: `${
    import.meta.env.VITE_APP_API
  }/configurations/restore-configuration`,
  archivedList: `${
    import.meta.env.VITE_APP_API
  }/configurations/get-archived-configurations`,
  archivedConfiguration: `${
    import.meta.env.VITE_APP_API
  }/configurations/get-archived-configuration`,
  list: `${import.meta.env.VITE_APP_API}/configurations/get-configurations`,
  create: `${import.meta.env.VITE_APP_API}/configurations/create-configuration`,
  update: `${import.meta.env.VITE_APP_API}/configurations/update-configuration`,
};
