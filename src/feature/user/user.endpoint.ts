export const USER_ENDPOINT = {
  list: `${import.meta.env.VITE_APP_API}/users/get-users`,
  create: `${import.meta.env.VITE_APP_API}/users/create-user`,
  detail: `${import.meta.env.VITE_APP_API}/users/get-user`,
  update: `${import.meta.env.VITE_APP_API}/users/update-user`,
  delete: `${import.meta.env.VITE_APP_API}/users/delete-user`,
  archive: `${import.meta.env.VITE_APP_API}/users/archive-user`,
  toggleStatus: `${import.meta.env.VITE_APP_API}/users/activate-or-block-user`,
  restore: `${import.meta.env.VITE_APP_API}/users/restore-user`,
  add_role: `${import.meta.env.VITE_APP_API}/users/add-user-roles`,
  user_profile: `${import.meta.env.VITE_APP_API}/users/get-my-profile`,
  profile_upload: `${import.meta.env.VITE_APP_API}/users/upload-picture`,
  updateProfile: `${
    import.meta.env.VITE_APP_API
  }/users/update-user-profile-image/`,
  archivedUser: `${import.meta.env.VITE_APP_API}/users/get-archived-user`,

  // added
  roles: `${import.meta.env.VITE_APP_API}/roles/get-roles`,
  user_role: `${import.meta.env.VITE_APP_API}/accounts/get-user-roles`,
  role_permissions_list: `${
    import.meta.env.VITE_APP_API
  }/roles/get-role-permissions`,
  add_account_role: `${import.meta.env.VITE_APP_API}/accounts/add-account-role`,
  add_account_role_permission: `${
    import.meta.env.VITE_APP_API
  }/accounts/add-account-permission`,
  user_role_permissions: `${
    import.meta.env.VITE_APP_API
  }/accounts/get-user-permissions-by-role-id`,
  remove_account_role: `${
    import.meta.env.VITE_APP_API
  }/accounts/remove-account-role`,
  reset_user_password: `${
    import.meta.env.VITE_APP_API
  }/auth/reset-user-password`,
};
