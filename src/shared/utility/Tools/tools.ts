export function downloadUrlParser(data: {
  originalname: any;
  path: any;
  filename: any;
  mimetype: any;
}) {
  let path = "";
  path += "&path=" + data.path;
  path += "&filename=" + data.filename;
  path += "&originalname=" + data.originalname;
  path += "&mimetype=" + data.mimetype;
  return import.meta.env["VITE_APP_API"] + "/download-file?" + path;
}
