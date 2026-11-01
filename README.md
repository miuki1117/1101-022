# 小林攝影工作室｜網站專案

這是一個可部署到 GitHub Pages 或 Vercel 的靜態網站專案，包含：

- `index.html`：完整單頁式網站（HTML、CSS、JavaScript）
- `google-apps-script.gs`：Google 試算表寫入與 Email 通知後端範例
- `images/`：網站圖片放置資料夾
- `images/README.txt`：圖片檔名與替換說明

## 1. 專案結構

```text
xiaolin-photography-website/
├── index.html
├── google-apps-script.gs
├── README.md
└── images/
    └── README.txt
```

## 2. 放入作品圖片

把圖片放入 `images/`，並使用網站 HTML 中對應的檔名。建議使用 JPG 或 WebP，圖片需由你本人擁有或已取得使用授權。

常用檔名：
- `hero.jpg`
- `wedding-01.jpg` 至 `wedding-04.jpg`
- `event-01.jpg` 至 `event-04.jpg`
- `portrait-01.jpg` 至 `portrait-04.jpg`

若 HTML 中有其他圖片路徑，請依 `index.html` 實際引用的檔名補上圖片。

## 3. 設定 Google 試算表與 Email 通知

1. 建立 Google 試算表，新增工作表並命名為 `詢單紀錄`。
2. 從試算表網址取得 ID：`https://docs.google.com/spreadsheets/d/這一段是ID/edit`
3. 開啟「擴充功能 → Apps Script」，將 `google-apps-script.gs` 的程式碼貼上。
4. 修改程式最上方的：
   - `SHEET_ID`
   - `NOTIFY_EMAIL`
5. 儲存後選擇「部署 → 新增部署作業 → 網頁應用程式」。
6. 設定「執行身分」為「我」，「誰可以存取」依你的網站需求設定；若選擇「所有人」，公開網址可能收到垃圾提交，請留意濫用風險。
7. 部署並授權後，複製 Web App URL。
8. 打開 `index.html`，搜尋 `GOOGLE_SCRIPT_URL`，將佔位文字替換成你的 Web App URL。

**注意：** 網站使用 `no-cors` 送出表單，瀏覽器無法讀取 Apps Script 的實際回應。因此頁面顯示送出提示不等於後端一定成功；請以 Google 試算表是否新增資料、通知 Email 是否收到為準。

## 4. 自訂聯絡資訊

在 `index.html` 搜尋並替換示範用的 Email、Instagram 連結及其他聯絡資訊。上線前請確認所有方案、價格、服務說明與作品圖片均為你的正式資料。

## 5. 本機預覽

直接用瀏覽器開啟 `index.html` 即可預覽。若使用 VS Code，也可使用 Live Server。

## 6. 部署到 Vercel

1. 將整個資料夾推送到 GitHub repository。
2. 登入 Vercel，選擇 Add New → Project。
3. 匯入該 GitHub repository。
4. Framework Preset 選 `Other`，Build Command 與 Output Directory 可留空（靜態 HTML 專案）。
5. 按 Deploy。

部署完成後，Vercel 會提供網站網址。之後推送更新到 GitHub，Vercel 通常會自動重新部署。

## 上線前檢查

- [ ] 替換所有作品圖片
- [ ] 更新 Email、Instagram 與聯絡資訊
- [ ] 設定 Google Apps Script 的試算表 ID 與通知 Email
- [ ] 將 Web App URL 填入 `index.html`
- [ ] 實際送出測試詢單，確認試算表有新增資料且收到通知信
- [ ] 手機與桌機各測試一次
