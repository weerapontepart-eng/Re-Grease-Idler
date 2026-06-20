# Re-Grease Idler — โปรแกรมบันทึก + Dashboard

ระบบบันทึกงาน **Re-Grease / ติดตั้ง ลูกกลิ้ง (Idler)** ของระบบสายพานลำเลียง
สำหรับ ITALIAN-THAI HONGSA — บันทึกออนไลน์ เก็บข้อมูลลง **Google Sheet** พร้อม Dashboard สรุปผล

## ไฟล์

- **`index.html`** — ทั้งโปรแกรม (HTML + CSS + JS อยู่ในไฟล์เดียว ไม่ต้อง build/ติดตั้งอะไร)
  เปิดด้วยเบราว์เซอร์ได้เลย หรือ deploy ขึ้น GitHub Pages
- **`apps-script.gs`** — โค้ด Google Apps Script สำหรับเขียนข้อมูลลงชีต
  (โค้ดเดียวกันนี้แสดงอยู่ในแท็บ "ตั้งค่า" ในแอป กดคัดลอกได้)

## 4 หน้า (แท็บ)

1. **บันทึกข้อมูล** — กรอกทีละรายการ (ฟอร์มค้างค่า วันที่/Belt/ประเภท/ผู้บันทึก ไว้ให้บันทึกต่อเนื่องได้เร็ว)
2. **Dashboard** — สรุปผลงานจริง (Actual): รายเดือน, แยก Belt / ประเภทลูกกลิ้ง / สภาพลูกปืน / Line, ตารางสรุป
3. **ข้อมูลทั้งหมด** — ตารางรวม ค้นหา/กรอง + ส่งออก CSV
4. **ตั้งค่า** — ใส่ Sheet ID + Apps Script URL และดูวิธีติดตั้ง

## โครงสร้างข้อมูล (คอลัมน์ในชีต `Records`)

`date, work_type, belt, roller_type, position, bearing, material, rubber, seal, qty_rollers, qty_sets, manpower, team, contractor_name, line, recorder, note, timestamp`

- **seal:** Seal Old | Seal New | - (งานเปลี่ยนซีล)

- **material:** ลูกเหล็ก | ลูกยาง (เฉพาะ Return / Flat Return — ถ้าลูกเหล็กจะไม่มีช่องเปลี่ยนยาง)

- **team:** ITH Idler | Contractor (ทีมงานที่ทำงาน)
- **contractor_name:** ชื่อผู้รับเหมา (กรอกเมื่อ team = Contractor)

- **work_type:** Re-Grease | ติดตั้ง
- **belt:** BW1800 | BW2200
- **roller_type:** Carry | Return | Impact | Flat Return
- **position:** ลูกข้าง | ลูกกลาง | - (เฉพาะ Carry)
- **bearing:** ลูกปืนเก่า | ใหม่ 1 ข้าง | ใหม่ทั้งหมด (เฉพาะ Re-Grease)
- **rubber:** Rubber Ring ใหม่ | Rubber Ring เก่า | - (เฉพาะ Return — งานเปลี่ยนยาง)
- หน่วยนับ: ลูก (qty_rollers), พวง (qty_sets), คน (manpower)
  - Carry 1 พวง = ลูกข้าง 2 + ลูกกลาง 1 · Return/Flat Return 1 พวง = 2 ลูก · Impact 1 พวง = 5 ลูก

## วิธีติดตั้ง (ครั้งเดียว)

1. สร้าง **Google Sheet** ใหม่ → คัดลอก **Sheet ID** จาก URL (ส่วนระหว่าง `/d/` กับ `/edit`)
2. ในชีต เปิด **Extensions → Apps Script** → วางโค้ดจาก `apps-script.gs` → **Save**
3. **Deploy → New deployment → Web app** (Execute as: *Me*, Who has access: *Anyone*) → คัดลอก **Web app URL** (ลงท้าย `/exec`)
4. แชร์ชีตให้อ่านได้: **Share → Anyone with the link → Viewer**
5. เปิด `index.html` → แท็บ **ตั้งค่า** → ใส่ Sheet ID + Apps Script URL → **บันทึก** → **ทดสอบการเชื่อมต่อ**

> หากยังไม่ตั้งค่า หรือเขียนชีตไม่สำเร็จ ระบบจะบันทึกลง **localStorage** ของเครื่องไว้ก่อน (มี badge `local`)

## หมายเหตุ

- Dashboard แสดงเฉพาะ **ผลงานจริง (Actual)** — ยังไม่มีระบบเป้าหมาย Plan vs Actual
- การตั้งค่า (Sheet ID / Script URL) เก็บใน localStorage ของเบราว์เซอร์ที่ใช้งาน
