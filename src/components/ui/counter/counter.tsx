'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl mt-4">ยอดผู้เข้าชมวันนี้: {count ?? 'กำลังโหลด...'}</p>
    </div>
  )
}
