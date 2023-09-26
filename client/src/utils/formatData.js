
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}
  
export const formatDate = (date) => {
  // Lấy ra định dạng thời gian của chuỗi dựa vào thời gian thực
  const today = new Date(date);
  // lấy ra năm
  let year = today.getFullYear();
  // Lấy ra tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  // Lấy ra ngày
  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }
  // Trả ra chuỗi cần định dạng
  return `${day}-${month}-${year}`;
};