<?php
// Incluye el autoload de Composer
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();                      // Habilita SMTP
    $mail->Host       = 'smtp.gmail.com'; // Especifica el servidor SMTP
    $mail->SMTPAuth   = true;             // Habilita la autenticación SMTP
    $mail->Username   = 'esdecunumi@gmail.com'; // Correo electrónico de origen
    $mail->Password   = 'Ceringoxdrd123$';   // Contraseña del correo electrónico de origen
    $mail->SMTPSecure = 'tls';            // Habilita el cifrado TLS o SSL
    $mail->Port       = 587;              // Puerto TCP para conectarse

    // Destinatario
    $mail->setFrom('esdecunumi@gmail.com', 'Tu Nombre');
    $mail->addAddress('valdezmelizza19.com', 'Destinatario'); // Agrega destinatario

    // Contenido del correo
    $mail->isHTML(true);                                  // Habilita contenido HTML
    $mail->Subject = 'Correo de prueba con PHPMailer';
    $mail->Body    = 'Este es un correo de prueba enviado con PHPMailer.';

    // Enviar correo
    $mail->send();
    echo 'Correo enviado correctamente';
} catch (Exception $e) {
    echo "Error al enviar el correo: {$mail->ErrorInfo}";
}
?>
