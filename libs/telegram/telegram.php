<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

/* https://api.telegram.org/bot740991206:AAHtILymr14vN-4ZBpxXVXpQU52FI24Wq_E/getUpdates */

$name = $_POST['name'];
$phone = $_POST['tel'];
$email = $_POST['email'];
$message = $_POST['message'];
$file = $_POST['file'];
$token = "740991206:AAHtILymr14vN-4ZBpxXVXpQU52FI24Wq_E";
$chat_id = "-339029286";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email:' => $email,
  'Сообщение:' => $message,
  'Файл:' => $file
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: https://alex-khrust.github.io/libs/thank-you.html');
} else {
  echo "Error";
}
?>
