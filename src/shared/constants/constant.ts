export const jobTypes = [
  { value: "Tutor", label: "Tutor" },
  { value: "Private Nurse", label: "Private Nurse" },
  { value: "Nanny", label: "Nanny" },
  { value: "Maid", label: "Maid" },
  { value: "Sales", label: "Sales" },
];

export const StatusList = [
  { value: "Pending", label: "Pending" },
  { value: "Active", label: "Active" },
  { value: "InActive", label: "InActive" },
  { value: "OnDuty", label: "OnDuty" },
];
export const regions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "SNNP",
  "Tigray",
];

export const Title = ["Ato", "Dr", "Prof", "Mr", "Mrs", "Miss", "Ms"];
const ArchiveReason: string[] = [
  "No Longer Needed",
  "Completed or Finalized",
  "Duplicate Entry",
  "Historical Reference",
  "Legal or Compliance Requirement",
  "Data Quality Issue",
  "Business Rule Change",
  "User Requested",
  "Inactive or Dormant",
  "It is incorrect and can't update it",
];
export const leaveJobConstants: string[] = [
  "Lack of career growth opportunities",
  "Uncompetitive compensation and benefits",
  "Inadequate management and leadership",
  "Limited recognition and appreciation",
  "Unsatisfactory company culture",
  "Job dissatisfaction",
  "Relocation or personal circumstances",
  "Health problems",
  "Better opportunities or offers",
  "Finished the contract",
  "Discipline",
];

export const Constants = {
  ArchiveReason: [...ArchiveReason],
  leaveJobReason: [...leaveJobConstants],
  UserArchiveReason: [
    ...ArchiveReason,
    "User has been terminated",
    "User has resigned",
  ],
};

export const daysOfWeek: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const timesOfDay: { title: string; value: string }[] = [
  {
    title: "12:00 AM",
    value: "12:00 AM",
  },
  {
    title: "12:30 AM",
    value: "12:30 AM",
  },
  {
    title: "01:00 AM",
    value: "01:00 AM",
  },
  {
    title: "01:30 AM",
    value: "01:30 AM",
  },
  {
    title: "02:00 AM",
    value: "02:00 AM",
  },
  {
    title: "02:30 AM",
    value: "02:30 AM",
  },
  {
    title: "03:00 AM",
    value: "03:00 AM",
  },
  {
    title: "03:30 AM",
    value: "03:30 AM",
  },
  {
    title: "04:00 AM",
    value: "04:00 AM",
  },
  {
    title: "04:30 AM",
    value: "04:30 AM",
  },
  {
    title: "05:00 AM",
    value: "05:00 AM",
  },
  {
    title: "05:30 AM",
    value: "05:30 AM",
  },
  {
    title: "06:00 AM",
    value: "06:00 AM",
  },
  {
    title: "06:30 AM",
    value: "06:30 AM",
  },
  {
    title: "07:00 AM",
    value: "07:00 AM",
  },
  {
    title: "07:30 AM",
    value: "07:30 AM",
  },
  {
    title: "08:00 AM",
    value: "08:00 AM",
  },
  {
    title: "08:30 AM",
    value: "08:30 AM",
  },
  {
    title: "09:00 AM",
    value: "09:00 AM",
  },
  {
    title: "09:30 AM",
    value: "09:30 AM",
  },
  {
    title: "10:00 AM",
    value: "10:00 AM",
  },
  {
    title: "10:30 AM",
    value: "10:30 AM",
  },
  {
    title: "11:00 AM",
    value: "11:00 AM",
  },
  {
    title: "11:30 AM",
    value: "11:30 AM",
  },
  {
    title: "12:00 PM",
    value: "12:00 PM",
  },
  {
    title: "12:30 PM",
    value: "12:30 PM",
  },
  {
    title: "01:00 PM",
    value: "01:00 PM",
  },
  {
    title: "01:30 PM",
    value: "01:30 PM",
  },
  {
    title: "02:00 PM",
    value: "02:00 PM",
  },
  {
    title: "02:30 PM",
    value: "02:30 PM",
  },
  {
    title: "03:00 PM",
    value: "03:00 PM",
  },
  {
    title: "03:30 PM",
    value: "03:30 PM",
  },
  {
    title: "04:00 PM",
    value: "04:00 PM",
  },
  {
    title: "04:30 PM",
    value: "04:30 PM",
  },
  {
    title: "05:00 PM",
    value: "05:00 PM",
  },
  {
    title: "05:30 PM",
    value: "05:30 PM",
  },
  {
    title: "06:00 PM",
    value: "06:00 PM",
  },
  {
    title: "06:30 PM",
    value: "06:30 PM",
  },
  {
    title: "07:00 PM",
    value: "07:00 PM",
  },
  {
    title: "07:30 PM",
    value: "07:30 PM",
  },
  {
    title: "08:00 PM",
    value: "08:00 PM",
  },
  {
    title: "08:30 PM",
    value: "08:30 PM",
  },
  {
    title: "09:00 PM",
    value: "09:00 PM",
  },
  {
    title: "09:30 PM",
    value: "09:30 PM",
  },
  {
    title: "10:00 PM",
    value: "10:00 PM",
  },
  {
    title: "10:30 PM",
    value: "10:30 PM",
  },
  {
    title: "11:00 PM",
    value: "11:00 PM",
  },
  {
    title: "11:30 PM",
    value: "11:30 PM",
  },
];

export const roomAmenities: string[] = ["Wifi", "Bath", "Toiletries "];

export const specificLocationsList = [
  { value: "Megenagna", label: "Megenagna" },
  { value: "Bole", label: "Bole" },
  { value: "Piassa", label: "Piassa" },
  { value: "Arat Kilo", label: "Arat Kilo" },
  { value: "Kirkos", label: "Kirkos" },
  { value: "Mexico", label: "Mexico" },
  { value: "Sarbet", label: "Sarbet" },
  { value: "Gullele", label: "Gullele" },
  { value: "Kasanchis", label: "Kasanchis" },
  { value: "Lideta", label: "Lideta" },
  { value: "Sidist Kilo", label: "Sidist Kilo" },
  { value: "Bole Michael", label: "Bole Michael" },
  { value: "Yeka", label: "Yeka" },
  { value: "Kera", label: "Kera" },
  // Add more locations as needed
];
export const ethiopianCities = [
  { label: "Addis Ababa", value: "Addis Ababa" },
  { value: "Adama", label: "Adama" },
  { label: "Bahir Dar", value: "Bahir Dar" },
  { label: "Hawassa", value: "Hawassa" },
  { label: "Assosa", value: "Assosa" },
  { label: "Mojo", value: "Mojo" },
  { label: "Jimma", value: "Jimma" },
  { label: "Jijiga", value: "Jijiga" },
  { label: "Ziway", value: "Ziway" },
  { label: "Yirga Alem", value: "Yirga Alem" },
  { label: "Bishoftu", value: "Bishoftu" },
  { label: "Debre Tabor", value: "Debre Tabor" },
  { label: "Debre Markos", value: "Debre Markos" },
  { label: "Debre Birhan", value: "Debre Birhan" },
  { label: "Yabelo", value: "Yabelo" },
  { label: "Werota", value: "Werota" },
  { label: "Wenji", value: "Wenji" },
  { label: "Shashemene", value: "Shashemene" },
  { label: "Shambu", value: "Shambu" },
  { label: "Shakiso", value: "Shakiso" },
  { label: "Sebeta", value: "Sebeta" },
  { label: "Robit", value: "Robit" },
  { label: "Nejo", value: "Nejo" },
  { label: "Metu", value: "Metu" },
  { label: "Metahara", value: "Metahara" },
  { label: "Mek'ele", value: "Mek'ele" },
  { label: "Maychew", value: "Maychew" },
  { label: "Korem", value: "Korem" },
  { label: "Kibre Mengist", value: "Kibre Mengist" },
  { label: "Kemise", value: "Kemise" },
  { label: "Kombolcha", value: "Kombolcha" },
  { label: "Jinka", value: "Jinka" },
  { label: "Inda Silase", value: "Inda Silase" },
  { label: "Hosaaina", value: "Hosaaina" },
  { label: "Harar", value: "Harar" },
  { label: "Hagere Hiywet", value: "Hagere Hiywet" },
  { label: "El Bahay", value: "El Bahay" },
  { label: "Gondar", value: "Gondar" },
  { label: "Goba", value: "Goba" },
  { label: "Waliso", value: "Waliso" },
  { label: "Ginir", value: "Ginir" },
  { label: "Gimbi", value: "Gimbi" },
  { label: "Raqo", value: "Raqo" },
  { label: "Genet", value: "Genet" },
  { label: "Gelemso", value: "Gelemso" },
  { label: "Gebre Guracha", value: "Gebre Guracha" },
  { label: "Gambela", value: "Gambela" },
  { label: "Finote Selam", value: "Finote Selam" },
  { label: "Fiche", value: "Fiche" },
  { label: "Felege Neway", value: "Felege Neway" },
  { label: "Golwayn", value: "Golwayn" },
  { label: "Dubti", value: "Dubti" },
  { label: "Dodola", value: "Dodola" },
  { label: "Dire Dawa", value: "Dire Dawa" },
  { label: "Dilla", value: "Dilla" },
  { label: "Dessie", value: "Dessie" },
  { label: "Dembi Dolo", value: "Dembi Dolo" },
  { label: "Debark", value: "Debark" },
  { label: "Butajira", value: "Butajira" },
  { label: "Bure", value: "Bure" },
  { label: "Bonga", value: "Bonga" },
  { label: "Boditi", value: "Boditi" },
  { label: "Bichena", value: "Bichena" },
  { label: "Bedesa", value: "Bedesa" },
  { label: "Bedele", value: "Bedele" },
  { label: "Bata", value: "Bata" },
  { label: "Bako", value: "Bako" },
  { label: "Assbe Tefera", value: "Assbe Tefera" },
  { label: "Asaita", value: "Asaita" },
  { label: "Assosa", value: "Assosa" },
  { label: "Ä€reka", value: "Ä€reka" },
  { label: "Arba Minch", value: "Arba Minch" },
  { label: "Axum", value: "Axum" },
  { label: "Hagere Maryam", value: "Hagere Maryam" },
  { label: "Agaro", value: "Agaro" },
  { label: "Addis Zemen", value: "Addis Zemen" },
  { label: "Adigrat", value: "Adigrat" },
  { label: "Adet", value: "Adet" },
  { label: "Abomsa", value: "Abomsa" },
  { label: "Qorof", value: "Qorof" },
  { label: "Kahandhale", value: "Kahandhale" },
  { label: "Lasoano", value: "Lasoano" },
  { label: "Neefkuceliye", value: "Neefkuceliye" },
  { label: "Yamarugley", value: "Yamarugley" },
  { label: "Sodo", value: "Sodo" },
  { label: "Digih Habar Es", value: "Digih Habar Es" },
  { label: "Waal", value: "Waal" },
  { label: "Fadhigaradle", value: "Fadhigaradle" },
];

export const ethiopianRegions = [
  { value: "Addis Ababa", label: "Addis Ababa" },
  { value: "Afar", label: "Afar" },
  { value: "Amhara", label: "Amhara" },
  { value: "Benishangul-Gumuz", label: "Benishangul-Gumuz" },
  { value: "Dire Dawa", label: "Dire Dawa" },
  { value: "Gambela", label: "Gambela" },
  { value: "Harari", label: "Harari" },
  { value: "Oromia", label: "Oromia" },
  { value: "Sidama", label: "Sidama" },
  { value: "Somali", label: "Somali" },
  { value: "SNNP", label: "SNNP" },
  { value: "Tigray", label: "Tigray" },
];
export const decodeMonth = (month: string) => {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "February";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    default:
      return "December";
  }
};
export const notificationTitles: {
  key: string;
  label: string;
  value: string;
}[] = [
  {
    key: "key1",
    label: "Profile Picture Replacement",
    value: "Profile Picture Replacement",
  },
  {
    key: "key2",
    label: "ID Replacement",
    value: "ID Replacement",
  },
  {
    key: "key3",
    label: "Payment confirmed",
    value: "Payment confirmed",
  },
  {
    key: "key4",
    label: "Update Your Salary Details",
    value: "Update Your Salary Details",
  },
  {
    key: "key5",
    label: "Update Your Availability",
    value: "Update Your Availability",
  },
];

export const notificationBodies: {
  key: string;
  label: string;
  value: string;
}[] = [
  {
    key: "key1",
    label: `We've noticed that the profile picture on your Emebet account does not meet our guidelines. To maintain a professional and consistent platform, we kindly request that you submit a clear, high-quality, and appropriate profile picture that represents you to our Telegram account @emebetjobs, and our team will be happy to update it for you. Kindly note that failure to do so may result in the deletion of your account

Best regards,
Emebet`,

    value: `We've noticed that the profile picture on your Emebet account does not meet our guidelines. To maintain a professional and consistent platform, we kindly request that you submit a clear, high-quality, and appropriate profile picture that represents you to our Telegram account @emebetjobs, and our team will be happy to update it for you. Kindly note that failure to do so may result in the deletion of your account

Best regards,
Emebet`,
  },
  {
    key: "key2",
    label: `We have noticed that the ID you uploaded does not appear to be a genuine representation of yourself. To ensure the integrity of our platform, we kindly request that you submit your ID document to our telegram account @emebetjobs, and our team will be happy to update it for you. Kindly note that failure to do so may result in the deletion of your account

Best regards,
Emebet`,
    value: `We have noticed that the ID you uploaded does not appear to be a genuine representation of yourself. To ensure the integrity of our platform, we kindly request that you submit your ID document to our telegram account @emebetjobs, and our team will be happy to update it for you. Kindly note that failure to do so may result in the deletion of your account

Best regards,
Emebet`,
  },
  {
    key: "key3",
    label: `Great news! Your account has been upgraded with the subscription package you paid for. Restart the app and explore new possibilities.

Emebet 
`,
    value: ` Great news! Your account has been upgraded with the subscription package you paid for. Restart the app and explore new possibilities.

Emebet `,
  },
  {
    key: "key4",
    label: `We've noticed that the salary details on your Emebet profile may not accurately reflect the current job market. To ensure you are considered for suitable opportunities, we recommend updating your salary information to a fair and competitive range to increase your chances of being matched with the right employers.

Best regards,
Emebet`,
    value: `We've noticed that the salary details on your Emebet profile may not accurately reflect the current job market. To ensure you are considered for suitable opportunities, we recommend updating your salary information to a fair and competitive range to increase your chances of being matched with the right employers.

Best regards,
Emebet`,
  },
  {
    key: "key5",
    label: `We've noticed that the availability you've selected on your Emebet profile does not seem to align with normal working hours. To ensure a smooth hiring process, please review and update your availability to reflect the correct work schedule.

Best regards,
Emebet
`,
    value: `We've noticed that the availability you've selected on your Emebet profile does not seem to align with normal working hours. To ensure a smooth hiring process, please review and update your availability to reflect the correct work schedule.

Best regards,
Emebet
`,
  },
];
