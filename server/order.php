<?php

header('Content-Type: application/json; charset=utf-8');

require './phpmailer/PHPMailerAutoload.php';

const OPTIONS = [
    "roof" => "крыша",
    "shield" => "моторный щит",
    "trunk" => "багажник",
    "hood" => "капот",
    "door" => "двери",
    "arch" => "колесные арки",
    "floor" => "пол",
];

$mail = new PHPMailer;
$mail->isSMTP();

$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;
$mail->Username = 'info@pro-silence.ru';
$mail->Password = 'ProSilence2019';
$mail->SMTPSecure = 'ssl';
$mail->Port = '465';

$mail->CharSet = 'UTF-8';
$mail->From = 'info@pro-silence.ru';
$mail->FromName = 'info@pro-silence.ru';
$mail->addAddress('info@pro-silence.ru', 'Менеджер');
$mail->isHTML(true);

$name = '';
if (!empty($_POST['name'])) {
    $Name = stripslashes($_POST['name']);
    $name = "
			<tr style=''>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Имя:</b></td>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Name</td>
			</tr>
    	";
}

$phone = '';
if (!empty($_POST['phone'])) {
    $Phone = stripslashes($_POST['phone']);
    $phone = "
			<tr style=''>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Телефон:</b></td>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Phone</td>
			</tr>
    	";
}

$email = '';
if (!empty($_POST['brand'])) {
    $Email = stripslashes($_POST['brand']);
    $email = "
			<tr style=''>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Марка:</b></td>
				<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Email</td>
			</tr>
    	";
}

$type = '';
if (!empty($_POST['model'])) {
    $Type = stripslashes($_POST['model']);
    $type = "
		<tr style=''>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Модель:</b></td>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Type</td>
		</tr>
		";
}

$services = '';
if (!empty($_POST['services'])) {
    $Services = stripslashes($_POST['services']);
    $services = "
		<tr style=''>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Пакет:</b></td>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Services</td>
		</tr>
		";
}

$comment = '';
if (!empty($_POST['comment'])) {
    $Comment = stripslashes($_POST['comment']);
    $comment = "
		<tr style=''>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Коммент:</b></td>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Comment</td>
		</tr>
		";
}

$options = '';
if (
    !empty($_POST['roof']) ||
    !empty($_POST['shield']) ||
    !empty($_POST['trunk']) ||
    !empty($_POST['hood']) ||
    !empty($_POST['door']) ||
    !empty($_POST['arch']) ||
    !empty($_POST['floor'])
) {
    $Options = [];
    foreach (OPTIONS as $key => $value) {
        if(!empty($_POST[$key])) $Options[] = $value;
    }
    $Options = join(', ', $Options);
    $options = "
		<tr style=''>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Опции:</b></td>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'>$Options</td>
		</tr>
		";
}

$timeDate = date('d.m.Y H:i');
$date = "
		<tr style=''>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'><b>Дата и время подачи заявки:</b></td>
			<td style='padding: 10px; border: 1px #d7dff1 solid;'>$timeDate</td>
		</tr>
	";


$mail->Subject = 'Заявка';
$mail->Body = "	<table style='width: 100%;'>$date $name $phone $email $type $services $options $comment</table> ";

$mail->send();
