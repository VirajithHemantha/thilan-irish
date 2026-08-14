/**
 * Google Apps Script to handle RSVP and Wishes submissions.
 * 
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1wPDh_57hLvvziIfO6hLgFbjMpPVWIe27h4kFxpaNUtw/edit
 * 3. Delete any code in Code.gs and paste this code.
 * 4. Click Save (Disk icon).
 * 5. Click Deploy > New deployment.
 * 6. Select "Web app" as the deployment type.
 * 7. Set:
 *    - Description: RSVP and Wishes Handler
 *    - Execute as: Me (your email)
 *    - Who has access: Anyone
 * 8. Click Deploy. Authorize access if prompted.
 * 9. Copy the "Web app URL" and update the SCRIPT_URL constant in src/App.tsx.
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Your Google Sheet ID
  var spreadsheetId = "1wPDh_57hLvvziIfO6hLgFbjMpPVWIe27h4kFxpaNUtw";

  // Set CORS headers for responses
  var output = ContentService.createTextOutput();

  try {
    // Open the spreadsheet by ID
    var ss = SpreadsheetApp.openById(spreadsheetId);

    // Check if event parameter is missing or empty
    if (!e || !e.parameter) {
      return output.setContent(JSON.stringify({
        status: "success",
        message: "Script runs successfully! Use query parameters to submit data."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get request parameters
    var params = e.parameter;
    var formName = params.formName; // "rsvp" or "wish"

    if (!formName) {
      // If visited directly in browser (no parameters)
      if (Object.keys(params).length === 0) {
        return ContentService.createTextOutput("RSVP and Wishes Google Apps Script is active and running successfully!")
          .setMimeType(ContentService.MimeType.TEXT);
      }
      var result = JSON.stringify({ status: "error", message: "Missing formName parameter" });
      return output.setContent(result).setMimeType(ContentService.MimeType.JSON);
    }

    var timestamp = new Date();
    var sheet;
    var headers = [];
    var rowData = [];

    if (formName === "rsvp") {
      var sheetName = "RSVP";
      sheet = ss.getSheetByName(sheetName);

      // Auto-create sheet and headers if not exists
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        headers = ["Timestamp", "Name", "Guests", "Dietary Notes"];
        sheet.appendRow(headers);

        // Format headers: Bold, background color, freeze first row
        sheet.getRange(1, 1, 1, headers.length)
          .setFontWeight("bold")
          .setBackground("#F3F4F6")
          .setHorizontalAlignment("center");
        sheet.setFrozenRows(1);

        // Auto-fit columns
        sheet.autoResizeColumns(1, headers.length);
      }

      // Map parameters to sheet columns
      var name = params["Name"] || params["name"] || "";
      var guests = params["Guests"] || params["guests"] || "0";
      var dietary = params["Dietary Notes"] || params["dietary"] || "";

      rowData = [timestamp, name, guests, dietary];
      sheet.appendRow(rowData);

    } else if (formName === "wish") {
      var sheetName = "Wishes";
      sheet = ss.getSheetByName(sheetName);

      // Auto-create sheet and headers if not exists
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        headers = ["Timestamp", "Name", "Message"];
        sheet.appendRow(headers);

        // Format headers: Bold, background color, freeze first row
        sheet.getRange(1, 1, 1, headers.length)
          .setFontWeight("bold")
          .setBackground("#F3F4F6")
          .setHorizontalAlignment("center");
        sheet.setFrozenRows(1);

        // Auto-fit columns
        sheet.autoResizeColumns(1, headers.length);
      }

      // Map parameters to sheet columns
      var name = params["Name"] || params["name"] || "";
      var message = params["Message"] || params["message"] || "";

      rowData = [timestamp, name, message];
      sheet.appendRow(rowData);

    } else {
      var result = JSON.stringify({ status: "error", message: "Invalid formName: " + formName });
      return output.setContent(result).setMimeType(ContentService.MimeType.JSON);
    }

    // Auto-fit column widths to accommodate new values
    sheet.autoResizeColumns(1, headers.length > 0 ? headers.length : 4);

    var result = JSON.stringify({ status: "success", data: rowData });
    return output.setContent(result).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var result = JSON.stringify({ status: "error", message: error.toString() });
    return output.setContent(result).setMimeType(ContentService.MimeType.JSON);
  }
}
