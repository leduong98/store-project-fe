
export const getMapStatus = () => {
  const mapStatus = new Map();
  mapStatus.set("WAIT_FOR_APPROVE", "APPROVED");
  mapStatus.set("APPROVED", "SUCCESSFUL");
  return mapStatus;
}

export const TransactionStatus = {
  WAIT_FOR_APPROVE: "Đợi xác nhận",
  APPROVED: 'Xác nhận',
  SUCCESSFUL: "Thành công",
  CANCEL: "Đã hủy"
}

export const TransactionStatusUser = {
  ACTIVE: "ACTIVE",
  NOT_ACTIVE: 'NOT ACTIVE'
}
