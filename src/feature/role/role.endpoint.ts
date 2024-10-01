export const ROLE_ENDPOINT = {
  list: `${import.meta.env.VITE_APP_API}/roles/get-roles`,
  permission: `${import.meta.env.VITE_APP_API}/permissions/get-permissions`,
  role_permissions: `${
    import.meta.env.VITE_APP_API
  }/roles/get-role-permissions`,
  create_role_permissions: `${
    import.meta.env.VITE_APP_API
  }/roles/add-role-permission`,
  remove_role_permissions: `${
    import.meta.env.VITE_APP_API
  }/roles/remove-role-permission`,
};
