<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latihan Pengulangan PHP</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h3>1. Bilangan Genap (1 - 10)</h3>
    <p>
        <?php
        $angkaGenap = [];
        for ($i = 1; $i <= 10; $i++) {
            if ($i % 2 == 0) {
                $angkaGenap[] = $i;
            }
        }
        echo implode(", ", $angkaGenap);
        ?>
    </p>

    <h3>2. Tabel Perkalian</h3>
    <table>
        <tr>
            <th>bilangan</th>
            <?php for ($j = 1; $j <= 10; $j++): ?>
                <th><?= $j ?></th>
            <?php endfor; ?>
        </tr>
        <?php for ($i = 1; $i <= 10; $i++): ?>
            <tr>
                <th><?= $i ?></th>
                <?php for ($j = 1; $j <= 10; $j++): ?>
                    <?php
                    $kali = $i * $j;
                    $warna = ($kali % 2 == 0) ? "sel-biru" : "sel-kuning";
                    ?>
                    <td class="<?= $warna ?>"><?= $kali ?></td>
                <?php endfor; ?>
            </tr>
        <?php endfor; ?>
    </table>
</body>
</html>