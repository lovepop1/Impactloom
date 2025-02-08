import Header from "@/components/Header"

export default function StakeholdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      <main className="flex-grow bg-background">{children}</main>
    </div>
  )
}

