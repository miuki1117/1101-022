/**
 * 小林攝影工作室｜詢單表單後端
 * 使用方式：
 * 1. 建立 Google 試算表，新增工作表「詢單紀錄」
 * 2. 在「擴充功能」>「Apps Script」貼上本程式
 * 3. 修改下方 SHEET_ID 與 NOTIFY_EMAIL
 * 4. 部署 > 新增部署作業 > 網頁應用程式
 *    - 執行身分：我
 *    - 誰可以存取：所有人
 * 5. 複製部署後的 Web App URL，填入 index.html 的 GOOGLE_SCRIPT_URL
 */

const SHEET_ID = "請填入你的 Google 試算表 ID";
const SHEET_NAME = "詢單紀錄";
const NOTIFY_EMAIL = "請填入你要接收新詢單通知的 Email";

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('找不到工作表「' + SHEET_NAME + '」');
    }

    // 第一次使用時建立欄位標題。
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "送出時間", "姓名", "聯絡方式", "拍攝類型",
        "預計日期", "拍攝地點", "預算", "需求描述"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.contact || "",
      data.type || "",
      data.date || "",
      data.location || "",
      data.budget || "",
      data.message || ""
    ]);

    const subject = "【小林攝影工作室】收到新的拍攝詢問";
    const body = [
      "收到一筆新的網站詢單：",
      "",
      "姓名：" + (data.name || ""),
      "聯絡方式：" + (data.contact || ""),
      "拍攝類型：" + (data.type || ""),
      "預計日期：" + (data.date || ""),
      "拍攝地點：" + (data.location || ""),
      "預算：" + (data.budget || ""),
      "",
      "需求描述：",
      data.message || "（未填寫）"
    ].join("\n");

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
