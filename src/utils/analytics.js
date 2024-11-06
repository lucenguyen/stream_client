import ReactGA from 'react-ga4';

// Khởi tạo Google Analytics với Tracking ID của bạn
export const initGA = () => {
  ReactGA.initialize('G-3PKP2VZC6Q');  // Thay bằng Tracking ID của bạn
};

// Gửi page view khi trang được tải
export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

// Gửi sự kiện (Event) tùy chọn
export const logEvent = (category, action, label = '', value = '') => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};
