/**
 * Chuyển đổi một chuỗi tiếng Việt có dấu thành không dấu.
 *
 * @param {string} str Chuỗi đầu vào.
 * @returns {string} Chuỗi không dấu.
 */
export function convertToSlug(str) {
  // Chuyển chuỗi về dạng NFD (Normalization Form D) để tách các ký tự có dấu
  // thành ký tự cơ bản và dấu thanh.
  str = str.normalize("NFD");
  
  // Dùng regex để thay thế tất cả các ký tự dấu thanh (từ U+0300 đến U+036f)
  // bằng chuỗi rỗng.
  return str.replace(/[\u0300-\u036f]/g, "");
}