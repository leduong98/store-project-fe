import constants from 'constants/index';


// fn: query string: ?t=0&key=1 => [{ t:0 }, { key: 1 }]
const queryString = (query = '') => {
  if (!query || query === '') return [];
  let result = [];
  let q = query;
  // xoá ký tự '?' nếu có
  if (q[0] === '?') q = q.slice(1, q.length);
  // tách các cụm query ['t=0', 'key=1']
  const queryList = q.split('&');
  result = queryList.map((str) => {
    let res = {};
    let temp = str.split('=');
    if (temp.length <= 1) res[temp[0]] = '';
    else res[temp[0]] = temp[1];
    return res;
  });

  return result;
};

// fn: định dạng chuỗi truy vấn
const formatQueryString = (str = '') => {
  let result = str;
  // xoá tất cả ký tự đặc biệt
  result = str.replace(/[`~!@#$%^&*()_|+\-=?;:<>\{\}\[\]\\\/]/gi, '');
  // thay khoảng trắng thành dấu cộng
  result = result.replace(/[\s]/gi, '+');
  return result;
};

// fn: hàm rút gọn tên sản phẩm
const reduceProductName = (name, length = 64) => {
  let result = name;
  if (name && name.length >= length) {
    result = name.slice(0, length) + ' ...';
  }
  return result;
};

// fn: hàm format giá sản phẩm
const formatProductPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

// fn: tính tỉ lệ sao của sản phẩm [1,2,3,4,5]
const calStar = (rates) => {
  const total = rates.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let rateTotal = 0;
  for (let i = 0; i < 5; ++i) {
    rateTotal += rates[i] * (i + 1);
  }
  return rateTotal / total;
};

// fn: chuyên width màn hình window -> size theo ant design
const convertWidthScreen = (size = 576) => {
  if (size < 576) return 'xs';
  if (size >= 576 && size < 768) return 'sm';
  if (size >= 768 && size < 992) return 'md';
  if (size >= 992 && size < 1200) return 'lg';
  if (size >= 1200 && size < 1600) return 'xl';
  return 'xxl';
};

// fn: Hàm chuyển rate thành text
const convertRateToText = (rate = 0) => {
  switch (rate) {
    case 0:
      return 'Sản phẩm quá tệ';
    case 1:
      return 'Sản phẩm không tốt';
    case 2:
      return 'Sản phẩm bình thường';
    case 3:
      return 'Sản phẩm tốt';
    case 4:
      return 'Cực kỳ hài lòng';
    default:
      return 'Sản phẩm bình thường';
  }
};

// fn: format thời gian
const formatDate = (date = new Date().getTime()) => {
  const d = new Date(date);
  const y = d.getFullYear(),
    m = d.getMonth(),
    day = d.getDate();

  return `${day} tháng ${m + 1}, ${y}`;
};


// fn: Chuyển đổi giá trị product từ number sang string
const convertProductValue = (type = 0, product) => {
  if (product === null || product === undefined) return product;
  switch (type) {
    // laptop
    case 0:
      const { cpu } = product;
      return {
        ...product,
        cpu: { ...cpu, series: convertSeriesChip(cpu.series) },
      };
    // disk
    case 1:
      const { size, connectionStd } = product;
      const newType = product.type ? 'SSD' : 'HDD';
      return {
        ...product,
        size: convertDiskSize(size),
        type: newType,
        connectionStd: convertDiskConnectionStd(connectionStd),
      };
    // display
    case 2:
      const { manufacturer } = product;
      const newManuf = manufacturer ? 'AMD' : 'NVIDIA';
      return { ...product, manufacturer: newManuf };
    // main board
    case 3:
      const { socketType, sizeStd } = product;
      return {
        ...product,
        socketType: convertMainboardSocket(socketType),
        sizeStd: convertMainboardSizeStd(sizeStd),
      };
    // ram
    case 4:
      const newRamType =
        product.type === 0 ? 'DDR3' : product.type === 1 ? 'DDR3L' : 'DDR4';
      return { ...product, type: newRamType };
    // mobile
    case 5:
      const newOps = product.operating ? 'IOS' : 'Android';
      return { ...product, operating: newOps };
    // headphone
    case 7:
      const newHeadphoneType = convertHeadphoneType(product.type);
      const newHPConnectionStd = convertHeadphoneConnectionStd(
        product.connectionStd,
      );
      return {
        ...product,
        type: newHeadphoneType,
        connectionStd: newHPConnectionStd,
      };
    //  keyboard
    case 8:
      const newKBType =
        product.type === 0
          ? 'Bàn phím thường'
          : product.type === 1
          ? 'Bàn phím giả cơ'
          : 'Bàn phím cơ';
      const newColor = convertKeyBoardColor(product.color);
      const newLed = convertKeyBoardLed(product.ledColor);
      return { ...product, type: newKBType, color: newColor, ledColor: newLed };
    // monitor
    case 9:
      return {
        ...product,
        bgPlate: convertBgPlate(product.bgPlate),
        resolution: convertMonitorResolution(product.resolution),
      };
    //  mouse
    case 10:
      return {
        ...product,
        type: product.type ? 'Không dây' : 'Có dây',
        isLed: product.isLed ? 'Có led' : 'Không led',
      };
    // router
    case 11:
      return {
        ...product,
        bandwidth: product.bandwidth ? '2.4 GHz/5 GHz' : '2.4 GHz',
      };
    // webcam
    case 14:
      const newResolution =
        product.resolution === 0
          ? '720p'
          : product.resolution === 1
          ? '1280 x 720'
          : '1920 x 1080';
      return {
        ...product,
        connectionStd: product.connectionStd ? 'USB 2.0' : 'USB',
        resolution: newResolution,
      };
    default:
      return product;
  }
};

// fn: chuyển đổi thời gian now -> dd/mm/yyyy
const formatOrderDate = (date = Date.now(), flag = 0) => {
  const newDate = new Date(date);
  const d = newDate.getDate(),
    m = newDate.getMonth() + 1,
    y = newDate.getFullYear();
  return flag === 0
    ? `${d}/${m}/${y}`
    : `${newDate.getHours()}:${newDate.getMinutes()} ${d}/${m}/${y}`;
};

// fn: chuyển đổi tình trạng đơn hàng
const convertOrderStatus = (orderStatus ) => {
  switch (orderStatus) {
    case "WAIT_FOR_APPROVE":
      return 'Đang giao hàng';
    case "SUCCESSFUL":
      return 'Thành công';
  }
};


// fn: tính tổng phí đơn hàng
const calTotalOrderFee = (order) => {
  const { transportFee, orderProd, numOfProd } = order;
  const total =
    transportFee +
    (orderProd.price * numOfProd -
      (orderProd.price * numOfProd * orderProd.discount) / 100);
  return total;
};

export default {
  formatQueryString,
  queryString,
  convertProductValue,
  reduceProductName,
  formatProductPrice,
  calStar,
  convertWidthScreen,
  convertRateToText,
  formatDate,
  formatOrderDate,
  convertOrderStatus,
  calTotalOrderFee,
};
