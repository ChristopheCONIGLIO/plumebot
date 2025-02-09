<?php
ob_implicit_flush(false);
header("Content-Type: text/plain");

$mode = $_POST['data_mode'];
$message = $_POST['data_data'];
$key = $_POST['data_key'];
$temperature = 0.0;

$fileNameWithKey = './FRESH/' . $key;
if (!file_exists($fileNameWithKey)) {
    $file = fopen($fileNameWithKey, 'w');
    fclose($file);
}

if ($mode == 1) {
    $temperature = 0.2;
    $message = "Corrige le texte suivant sans changer l'ordre des mots et en respectant tous les sauts de ligne: " . $message;
}
if ($mode == 2) {
    $temperature = 0.5;
    $message = 'Reformulez le texte suivant en utilisant des synonymes et des structures de phrases alternatives, tout en veillant à ce que le sens global reste le même. Essayez de minimiser tout changement substantiel dans le contenu et la tonalité : ' . $message;
}
if ($mode == 3) {
    $temperature = 0.5;
    $message = 'Structure le texte avec des bullet point et des grande sections si besoin en utilisant des synonymes et des structures de phrases alternatives, tout en veillant à ce que le sens global reste le même. Essayez de minimiser tout changement substantiel dans le contenu et la tonalité : ' . $message;
}
if ($mode == 4) {
    $temperature = 0.5;
    $message = 'Reformulez le texte en mode mail en utilisant des synonymes et des structures de phrases alternatives, tout en veillant à ce que le sens global reste le même. Essayez de minimiser tout changement substantiel dans le contenu et la tonalité : ' . $message;
}
if ($mode == 5) {
    $temperature = 0.5;
    $message = 'Reformulez le texte en mode tweet avec tous ce qui va bien genre tag etc... respecter les 280 caractères en utilisant des synonymes et des structures de phrases alternatives, tout en veillant à ce que le sens global reste le même. Essayez de minimiser tout changement substantiel dans le contenu et la tonalité : ' . $message;
}

$objFichKey = fopen($fileNameWithKey, "a");

$ch = curl_init();
$url = "https://api.openai.com/v1/chat/completions";
$headers = array(
    "Content-Type: application/json",
    "Authorization: Bearer sk-qVobRLst47sgFc92GVPVT"
);

$finalResponse = '';

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $response) use ($objFichKey, &$finalResponse) {
    static $buffer = ''; 
    $buffer .= $response; 

    while (($pos = strpos($buffer, "data: ")) !== false) {
        $chunkStart = $pos + 6;
        $endPos = strpos($buffer, "\n", $chunkStart);

        if ($endPos === false) break;

        $chunk = trim(substr($buffer, $chunkStart, $endPos - $chunkStart));
        $buffer = substr($buffer, $endPos + 1); 

        if ($chunk === '' || $chunk === '[DONE]') continue;

        $arrayData = json_decode($chunk, true);

        if (json_last_error() === JSON_ERROR_NONE && isset($arrayData['choices'][0]['delta']['content'])) {
            $content = $arrayData['choices'][0]['delta']['content'];
            $finalResponse .= $content;
            if ($objFichKey) {
                fwrite($objFichKey, $content);
                fflush($objFichKey);
            }
        }
    }

    // Traiter le reste du buffer après la fin de réception
    if (!empty(trim($buffer))) {
        $chunk = trim(substr($buffer, strpos($buffer, "data: ") + 6));
        if ($chunk !== '' && $chunk !== '[DONE]') {
            $arrayData = json_decode($chunk, true);
            if (json_last_error() === JSON_ERROR_NONE && isset($arrayData['choices'][0]['delta']['content'])) {
                $content = $arrayData['choices'][0]['delta']['content'];
                $finalResponse .= $content;
                if ($objFichKey) {
                    fwrite($objFichKey, $content);
                    fflush($objFichKey);
                }
            }
        }
    }

    return strlen($response);
});



$requestBody = json_encode(array(
    "model" => "gpt-4o",
    "stream" => true,
    "temperature" => $temperature,
    "max_tokens" => 1000,
    "messages" => array(
        array(
            "role" => "user",
            "content" => $message
        )
    )
));

curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
curl_exec($ch);
curl_close($ch);

if ($objFichKey) fclose($objFichKey);
if (file_exists($fileNameWithKey)) unlink($fileNameWithKey);

echo $finalResponse;
?>
