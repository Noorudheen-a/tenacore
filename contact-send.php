<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, bool $success, string $message): void {
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Please use the contact form to send a message.');
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://tenacore.in', 'https://www.tenacore.in'], true)) {
    respond(403, false, 'Please send your message from tenacore.in.');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) respond(413, false, 'Your message is too long.');
function field(string $name): string {
    $value = $_POST[$name] ?? '';
    return is_string($value) ? trim($value) : '';
}
if (field('website') !== '') respond(400, false, 'Unable to send this message.');
$name = field('name');
$email = field('email');
$phone = field('phone');
$interest = field('interest');
$message = field('message');
if ($name === '' || strlen($name) > 400 || preg_match('/[\r\n]/', $name) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 200 || preg_match('/[\r\n]/', $email) ||
    $interest === '' || strlen($interest) > 200 || strlen($phone) > 100 ||
    strlen($message) < 10 || strlen($message) > 12000) {
    respond(422, false, 'Please check your name, email, service and message.');
}
// Limit repeated sends without keeping enquiry content on the server.
$ratePath = sys_get_temp_dir() . '/tenacore-contact-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$lock = @fopen($ratePath, 'c+');
if ($lock === false || !flock($lock, LOCK_EX)) respond(503, false, 'Please try again shortly or email info@tenacore.com.');
$last = (int)stream_get_contents($lock);
if ($last > time() - 60) { fclose($lock); respond(429, false, 'Please wait a minute before sending another message.'); }
$body = "New enquiry from tenacore.in\n\nName: $name\nEmail: $email\nPhone: " . ($phone ?: 'Not provided') . "\nService: $interest\n\nMessage:\n$message\n";
$headers = [
    'From: Tenacore Website <website@tenacore.in>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];
$sent = @mail('info@tenacore.com', 'New website enquiry | Tenacore', $body, implode("\r\n", $headers));
if ($sent) { rewind($lock); ftruncate($lock, 0); fwrite($lock, (string)time()); }
flock($lock, LOCK_UN); fclose($lock);
if (!$sent) respond(503, false, 'We could not send your message. Please email info@tenacore.com or try again later.');
respond(200, true, 'Your message has been sent. We’ll get back to you soon.');
