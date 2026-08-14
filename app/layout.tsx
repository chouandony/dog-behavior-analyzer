export const metadata = {
  title: 'PawBehavior - 狗狗行為分析與訓練對策',
  description: '基於ABC行為分析，科學理解狗狗不良行為的根本原因，取得專業訓練對策。不是讓狗不敢做錯，而是讓狗知道怎麼做對。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-paw-cream">{children}</body>
    </html>
  )
}