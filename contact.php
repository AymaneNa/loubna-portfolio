<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

$nom      = trim($_POST['nom'] ?? '');
$courriel = trim($_POST['courriel'] ?? '');
$sujet    = trim($_POST['sujet'] ?? '');
$message  = trim($_POST['message'] ?? '');

if (
    $nom === '' || $sujet === '' || $message === '' ||
    !filter_var($courriel, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($nom) > 100 || mb_strlen($sujet) > 150 ||
    mb_strlen($courriel) > 150 || mb_strlen($message) > 5000
) {
    header('Location: contact.html?envoi=erreur');
    exit;
}

$hote        = 'localhost';
$base        = 'u912233860_portfolioloub';
$utilisateur = 'u912233860_loubna';
$motDePasse  = 'Loubna123@123123';

try {
    $pdo = new PDO(
        "mysql:host=$hote;dbname=$base;charset=utf8mb4",
        $utilisateur,
        $motDePasse,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $requete = $pdo->prepare(
        'INSERT INTO messages (nom, courriel, sujet, message) VALUES (:nom, :courriel, :sujet, :message)'
    );

    $requete->execute([
        ':nom'      => $nom,
        ':courriel' => $courriel,
        ':sujet'    => $sujet,
        ':message'  => $message
    ]);

    header('Location: contact.html?envoi=succes');
} catch (PDOException $e) {
    header('Location: contact.html?envoi=erreur');
}
exit;
