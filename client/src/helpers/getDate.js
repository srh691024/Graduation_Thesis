const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, cần cộng thêm 1.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default formatDate;