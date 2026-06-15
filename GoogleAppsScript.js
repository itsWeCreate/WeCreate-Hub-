
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
 * 7. Copy the Web App URL and paste it into your 'config.ts' file in the React project.
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
  
  const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (configSheet.getLastRow() === 0) {
    configSheet.getRange(1, 1).setValue('{}');
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === 'getConfig') {
    const sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
    const data = sheet.getRange(1, 1).getValue() || '{}';
    return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'No action specified' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // ACTION: Save Config
    if (data.action === 'saveConfig') {
      const sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
      sheet.getRange(1, 1).setValue(JSON.stringify(data.config));
      return createResponse({ result: 'success' });
    }
    
    // ACTION: Handle Form Submissions
    const timestamp = new Date();
    let sheet;
    let rowData = [];

    if (data.formType === 'partnershipInquiry') {
      sheet = ss.getSheetByName(INQUIRIES_SHEET_NAME);
      rowData = [timestamp, data.fullName, data.organization, data.email, data.phone, data.partnershipType, data.budget, data.message];
    } else if (data.formType === 'programNotification') {
      sheet = ss.getSheetByName(NOTIFICATIONS_SHEET_NAME);
      rowData = [timestamp, data.fullName, data.email, data.programInterested];
    } else if (data.formType === 'leadCapture' || data.formType === 'quizSubmission' || data.formType === 'generalInquiry') {
      sheet = ss.getSheetByName(LEADS_SHEET_NAME);
      rowData = [timestamp, data.formType, data.fullName, data.email, data.message || '', data.partnershipType || ''];
      
      // Auto-email user their result if formType is quizSubmission
      if (data.formType === 'quizSubmission' && data.email) {
        try {
          const personName = data.fullName || 'Innovator';
          const emailSubject = "Your WeCreate AI Snapshot Results";
          
          let emailBody = "Hi " + personName + ",\n\n";
          emailBody += "Thank you for completing the WeCreate AI Snapshot! Here is your custom operational diagnosis and full transcript:\n\n";
          emailBody += "--------------------------------------------------\n";
          emailBody += data.message + "\n";
          emailBody += "--------------------------------------------------\n\n";
          emailBody += "What's Next?\n";
          emailBody += "- Focus on removing your primary process bottleneck to free up time to grow your business.\n";
          emailBody += "- If you want a comprehensive look under the hood, consider booking our 1-on-1 AI Checkup session or structured Process Analysis.\n\n";
          emailBody += "Book an AI Checkup: https://wecreatehub.com/optimize \n\n";
          emailBody += "We're excited to see what you build!\n\n";
          emailBody += "Best regards,\n";
          emailBody += "The WeCreate Team\n";
          emailBody += "itswecreate@gmail.com";

          MailApp.sendEmail({
            to: data.email,
            subject: emailSubject,
            body: emailBody,
            replyTo: "itswecreate@gmail.com"
          });
        } catch (mailError) {
          // Log the error but don't break the sheet entry
          Logger.log("Email error: " + mailError.toString());
        }
      }
    }

    if (sheet) {
      sheet.appendRow(rowData);
      return createResponse({ result: 'success' });
    }

    return createResponse({ result: 'error', error: 'Invalid form type' });

  } catch (error) {
    return createResponse({ result: 'error', error: error.toString() });
  }
}

function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
