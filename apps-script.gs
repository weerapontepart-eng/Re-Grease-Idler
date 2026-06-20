// ===== Re-Grease Idler — Google Apps Script =====
// วางโค้ดนี้ใน Extensions → Apps Script ของ Google Sheet ที่จะเก็บข้อมูล
// แล้ว Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone)

const HEADERS = ['date','work_type','belt','roller_type','position','bearing','material','rubber','seal',
                 'qty_rollers','qty_sets','manpower','team','contractor_name','line','recorder','note','timestamp'];

function doGet(e){
  try{
    var action = (e.parameter.action || '').toLowerCase();
    if(action === 'append') return append_(e.parameter);
    return json_({ok:true, msg:'Re-Grease Idler API'});
  }catch(err){ return json_({ok:false, error:String(err)}); }
}

function append_(p){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheets()[0];                 // เขียนลงชีตแรก (gid=0) ให้ตรงกับที่แอปอ่าน
  if(sh.getLastRow() === 0) sh.appendRow(HEADERS);
  var row = HEADERS.map(function(h){
    return h === 'timestamp' ? new Date() : (p[h] != null ? p[h] : '');
  });
  sh.appendRow(row);
  return json_({ok:true});
}

function json_(o){
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
