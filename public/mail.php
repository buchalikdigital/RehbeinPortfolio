<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false]);
    exit;
}

// ── NACH DIENSTAG: Diese Zeile ändern auf 'info@freitag-dortmund.de' ──
$to = 'buchalikwebsites@gmail.com';
// ─────────────────────────────────────────────────────────────────────

$subject_prefix = 'Neue Anfrage über freitag-dortmund.de';

// JSON-Input lesen
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false]);
    exit;
}

// Honeypot-Check (Bot-Schutz)
if (!empty($input['honeypot'])) {
    echo json_encode(['success' => true]);
    exit;
}

function clean($val) {
    return htmlspecialchars(strip_tags(trim($val ?? '')), ENT_QUOTES, 'UTF-8');
}

$name    = clean($input['name']);
$email   = clean($input['email']);
$phone   = clean($input['phone']);
$subject = clean($input['subject']);
$message = clean($input['message']);

// Validierung
if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 5) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Bitte alle Pflichtfelder ausfüllen.']);
    exit;
}

$mail_subject = $subject_prefix . ($subject ? ': ' . $subject : '');

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Freitag Website <noreply@freitag-dortmund.de>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";

$body = "
<!DOCTYPE html>
<html lang='de'>
<head><meta charset='UTF-8'><style>
  body { font-family: Arial, sans-serif; color: #1a1a1a; background: #faf7f2; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(184,76,30,0.2); }
  .header { background: linear-gradient(135deg, #B84C1E, #C8974A); padding: 28px 32px; }
  .header h1 { margin: 0; color: #fff; font-size: 20px; font-weight: 700; }
  .header p { margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 13px; }
  .body { padding: 28px 32px; }
  .field { margin-bottom: 20px; }
  .label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #B84C1E; margin-bottom: 6px; }
  .value { font-size: 15px; color: #1a1a1a; line-height: 1.6; }
  .message-box { background: #faf7f2; border-left: 3px solid #B84C1E; padding: 14px 16px; border-radius: 0 8px 8px 0; }
  .footer { background: #f0e8d8; padding: 16px 32px; font-size: 12px; color: #6B5040; text-align: center; }
</style></head>
<body>
<div class='wrap'>
  <div class='header'>
    <h1>Neue Kundenanfrage</h1>
    <p>Über das Kontaktformular auf freitag-dortmund.de</p>
  </div>
  <div class='body'>
    <div class='field'>
      <div class='label'>Name</div>
      <div class='value'>{$name}</div>
    </div>
    <div class='field'>
      <div class='label'>E-Mail</div>
      <div class='value'><a href='mailto:{$email}' style='color:#B84C1E'>{$email}</a></div>
    </div>" .
    ($phone ? "
    <div class='field'>
      <div class='label'>Telefon</div>
      <div class='value'>{$phone}</div>
    </div>" : "") .
    ($subject ? "
    <div class='field'>
      <div class='label'>Betreff</div>
      <div class='value'>{$subject}</div>
    </div>" : "") . "
    <div class='field'>
      <div class='label'>Nachricht</div>
      <div class='value message-box'>" . nl2br($message) . "</div>
    </div>
  </div>
  <div class='footer'>Heinrich Freitag GmbH &bull; Am Geenseel 12, 44263 Dortmund</div>
</div>
</body></html>
";

$sent = mail($to, $mail_subject, $body, $headers);

if ($sent) {
    // Auto-Antwort an den Absender
    $reply_headers  = "MIME-Version: 1.0\r\n";
    $reply_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $reply_headers .= "From: Heinrich Freitag GmbH <info@freitag-dortmund.de>\r\n";

    $reply_body = "
    <!DOCTYPE html>
    <html lang='de'><head><meta charset='UTF-8'><style>
      body { font-family: Arial, sans-serif; color: #1a1a1a; background: #faf7f2; margin:0; padding:0; }
      .wrap { max-width: 520px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(184,76,30,0.2); }
      .header { background: linear-gradient(135deg, #B84C1E, #C8974A); padding: 28px 32px; }
      .header h1 { margin:0; color:#fff; font-size:20px; }
      .body { padding: 28px 32px; font-size: 15px; line-height: 1.7; color: #444; }
      .footer { background: #f0e8d8; padding: 16px 32px; font-size: 12px; color: #6B5040; text-align: center; }
    </style></head>
    <body>
    <div class='wrap'>
      <div class='header'><h1>Vielen Dank, {$name}!</h1></div>
      <div class='body'>
        <p>Ihre Anfrage ist bei uns angekommen.</p>
        <p>Wir melden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen.</p>
        <p>Mit freundlichen Grüßen,<br><strong>Heinrich Freitag GmbH</strong><br>0231 - 94 11 310</p>
      </div>
      <div class='footer'>freitag-dortmund.de &bull; Am Geenseel 12, 44263 Dortmund</div>
    </div>
    </body></html>
    ";

    mail($email, 'Ihre Anfrage bei Heinrich Freitag GmbH', $reply_body, $reply_headers);

    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false]);
}
