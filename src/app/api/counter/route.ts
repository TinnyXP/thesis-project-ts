import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const counterFilePath = path.join(process.cwd(), 'counter.json')
const ipLogFilePath = path.join(process.cwd(), 'ip-log.json')
const ipHistoryFilePath = path.join(process.cwd(), 'ip-history.json')

// ฟังก์ชันดึงวันที่ปัจจุบันแบบ YYYY-MM-DD
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

// ฟังก์ชันดึง IP ของผู้ใช้
function getClientIP(req: NextRequest): string {
  const xForwardedFor = req.headers.get('x-forwarded-for')
  return xForwardedFor?.split(',')[0]?.trim() || 'unknown'
}

export async function GET(req: NextRequest) {
  try {
    let count = 0
    const today = getTodayDate()
    const ip = getClientIP(req)

    // อ่านไฟล์ counter ปัจจุบัน
    if (fs.existsSync(counterFilePath)) {
      const data = fs.readFileSync(counterFilePath, 'utf-8')
      count = JSON.parse(data).count || 0
    }

    // อ่านไฟล์ ip-log หรือสร้างใหม่
    let ipLog: Record<string, string> = {}
    if (fs.existsSync(ipLogFilePath)) {
      const data = fs.readFileSync(ipLogFilePath, 'utf-8')
      ipLog = JSON.parse(data)
    }

    // ถ้า IP นี้ยังไม่ถูกนับในวันนี้
    if (ipLog[ip] !== today) {
      count += 1
      ipLog[ip] = today

      // บันทึกทั้ง count และ ip-log
      fs.writeFileSync(counterFilePath, JSON.stringify({ count }, null, 2), 'utf-8')
      fs.writeFileSync(ipLogFilePath, JSON.stringify(ipLog, null, 2), 'utf-8')

      // ✅ เพิ่ม log IP + timestamp ลง ip-history.json
      let ipHistory: { ip: string; timestamp: string }[] = []
      if (fs.existsSync(ipHistoryFilePath)) {
        const historyData = fs.readFileSync(ipHistoryFilePath, 'utf-8')
        ipHistory = JSON.parse(historyData)
      }

      ipHistory.push({
        ip,
        timestamp: new Date().toISOString(),
      })

      fs.writeFileSync(ipHistoryFilePath, JSON.stringify(ipHistory, null, 2), 'utf-8')
    }

    return NextResponse.json({ count })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
