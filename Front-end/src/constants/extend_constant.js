
export const getMapStatus = () => {
  const mapStatus = new Map();
  mapStatus.set("WAIT_FOR_APPROVE", "APPROVED");
  mapStatus.set("APPROVED", "TRANSPORT");
  mapStatus.set("TRANSPORT", "SUCCESSFUL_TRANSPORT");
  return mapStatus;
}

export const TransactionStatus = {
  WAIT_FOR_APPROVE: "Đợi xác nhận",
  APPROVED: 'Xác nhận',
  TRANSPORT: "Vận chuyển",
  SUCCESSFUL_TRANSPORT: "Vận chuyển thành công",
  RECEIVED: "Đã nhận",
  CANCEL: "Đã hủy"
}

export default {
  MAX_JAVA_INTEGER: 2147483647
};
