export const FEEDBACK_ENDPOINT = {
  detail: `${import.meta.env.VITE_APP_API}/feedbacks/get-feedback`,
  delete: `${import.meta.env.VITE_APP_API}/feedbacks/delete-feedback`,
  archive: `${import.meta.env.VITE_APP_API}/feedbacks/archive-feedback`,
  restore: `${import.meta.env.VITE_APP_API}/feedbacks/restore-feedback`,
  archivedList: `${
    import.meta.env.VITE_APP_API
  }/feedbacks/get-archived-feedbacks`,
  list: `${import.meta.env.VITE_APP_API}/feedbacks/get-feedbacks`,
  review: `${import.meta.env.VITE_APP_API}/feedbacks/update-is-reviewed`,
};
