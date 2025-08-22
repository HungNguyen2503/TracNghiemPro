/**
 * Chuyển đổi một chuỗi ngày tháng ISO thành định dạng dễ đọc.
 * @param {string} dateString - Chuỗi ngày tháng theo định dạng ISO 8601 (ví dụ: "2025-08-21T06:17:39.632Z").
 * @returns {string} Chuỗi ngày tháng đã được định dạng (ví dụ: "21/08/2025, 13:17:39").
 */
export function formatDate(dateString) {
  // Tạo một đối tượng Date từ chuỗi
  const dateObject = new Date(dateString);

  // Định dạng ngày theo ngôn ngữ và múi giờ Việt Nam
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  return dateObject.toLocaleString('vi-VN', options);
}