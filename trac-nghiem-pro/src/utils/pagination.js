export const pagination = (data, itemsPerPage, currentPage=1) => (
  {
    "currentItems": data.slice(itemsPerPage*(currentPage-1), itemsPerPage*currentPage),
    "totalPages": Math.ceil(data.length/itemsPerPage),
    "currentPage": currentPage,
  }
)

  