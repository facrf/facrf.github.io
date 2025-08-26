<?php

// URL da API da CoinGecko para obter o preço do Bitcoin
$url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl';

// Inicializa a sessão cURL
$curl = curl_init();

// Define as opções para a requisição cURL
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Retorna a resposta como uma string

// Executa a requisição e armazena a resposta
$response = curl_exec($curl);

// Fecha a sessão cURL
curl_close($curl);

// Decodifica o JSON da resposta para um array PHP
$data = json_decode($response, true);

// Verifica se a requisição foi bem-sucedida
if ($data && isset($data['bitcoin'])) {
    $bitcoin_data = $data['bitcoin'];
    $price_usd = number_format($bitcoin_data['usd'], 2, '.', ','); // Formata o preço em USD
    $price_brl = number_format($bitcoin_data['brl'], 2, '.', ','); // Formata o preço em BRL

    echo "<h1>Preço do Bitcoin</h1>";
    echo "<p>Preço atual do Bitcoin (BTC):</p>";
    echo "<ul>";
    echo "<li><strong>USD:</strong> $$price_usd</li>";
    echo "<li><strong>BRL:</strong> R$$price_brl</li>";
    echo "</ul>";

} else {
    echo "Não foi possível obter o preço do Bitcoin. Tente novamente mais tarde.";
}

?>
