export default function Card({ children }: { children: React.ReactNode }) {
  const cardstyle = ` bg-white w-full h-full rounded-xl  gap-8 p-5 mb-4 shadow-md`;
  return (
    <div className={cardstyle}>
      {children}
    </div>
  )

}
