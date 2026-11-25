<?php

require_once "Kucing.php";
require_once "Anjing.php";

$kucing = new Kucing();
$kucing->setNama("Mochi");
$kucing->setUmur(2);

$anjing = new Anjing();
$anjing->setNama("Rex");
$anjing->setUmur(4);

$daftarHewan = [$kucing, $anjing];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Hewan</title>
</head>
<body>
    <h2>Data Hewan</h2>

    <?php foreach ($daftarHewan as $hewan): ?>
        <p>
            Nama: <?= htmlspecialchars($hewan->getNama()) ?><br>
            Umur: <?= $hewan->getUmur() ?> tahun<br>
            Jenis: <?= htmlspecialchars($hewan->getJenis()) ?><br>
            Suara: <?= htmlspecialchars($hewan->getSuara()) ?>
        </p>
        <hr>
    <?php endforeach; ?>
</body>
</html>