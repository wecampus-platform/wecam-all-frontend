import './globals.css';
import AuthInitializer from './AuthInitializer';
import AuthGate from './AuthGate';

export const metadata = {
  title: '위캠',
  description: '위캠 프로젝트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AuthInitializer />
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
