/**
 * WeCreate - Master Backend Script
 * 
 * Instructions:
 * 1. Open a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any code in Code.gs and paste this in.
 * 4. Click 'Run' on the 'init' function once to setup sheets.
 * 5. Click 'Deploy' > 'New Deployment' > 'Web App'.
 * 6. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'.
 * 7. Copy the Web App URL and paste it into your 'config.ts' file.
 */

const CONFIG_SHEET_NAME = 'Config';
const INQUIRIES_SHEET_NAME = 'Inquiries';
const NOTIFICATIONS_SHEET_NAME = 'Notifications';
const LEADS_SHEET_NAME = 'Leads';

function init() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [CONFIG_SHEET_NAME, INQUIRIES_SHEET_NAME, NOTIFICATIONS_SHEET_NAME, LEADS_SHEET_NAME].forEach(name => {
    if (!ss.getSheetByName(name)) {
      ss.insertSheet(name);
    }
  });
  
  // Set default config if empty
  const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (configSheet.getLastRow() === 0) {
    configSheet.getRange(1, 1).setValue('{}');
  }
}

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getConfig') {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
    const data = sheet.getRange(1, 1).getValue();
    return ContentService.createTextOutput(data).set