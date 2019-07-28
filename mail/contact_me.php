<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer.php';

// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'harv3yh@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Creation:  $name";
$email_body = "Name: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@devhead.net\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   


//mail($to,$email_subject,$email_body,$headers); mail() not allowed, use gmail

$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "devheadstudio@gmail.com";
$mail->Password = "9a7SHo8pSm";
$mail->setFrom('devheadstudio@gmail.com', 'Mail Forward');
$mail->addReplyTo($email_address, $name);
$mail->addAddress('harv3yh@gmail.com', 'Harvey Hopkins');
$mail->Subject = 'PHPMailer GMail SMTP test';
//$mail->msgHTML(file_get_contents('contents.html'), __DIR__);
$mail->Body = $email_body;

if (!$mail->send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
   return false;
} else {
   echo "Message sent!";
   return true;
}
?>