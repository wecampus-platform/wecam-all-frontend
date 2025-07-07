
import './globals.css';

export const metadata = {
  title: '위캠',
  description: '위캠 프로젝트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
