<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #e36c19;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
        }
        .info-row {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #e36c19;
        }
        .message-box {
            background-color: white;
            padding: 20px;
            border-left: 4px solid #e36c19;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouveau message de contact</h1>
    </div>
    <div class="content">
        <p>Vous avez reçu un nouveau message depuis le formulaire de contact du site CITL.</p>

        <div class="info-row">
            <span class="label">Civilité :</span>
            @if($civility === 'mr')
                Monsieur
            @elseif($civility === 'mrs')
                Madame
            @elseif($civility === 'miss')
                Mademoiselle
            @endif
        </div>

        <div class="info-row">
            <span class="label">Nom :</span> {{ $senderName }}
        </div>

        <div class="info-row">
            <span class="label">Email :</span> <a href="mailto:{{ $senderEmail }}">{{ $senderEmail }}</a>
        </div>

        @if($senderPhone)
        <div class="info-row">
            <span class="label">Téléphone :</span> {{ $senderPhone }}
        </div>
        @endif

        @if($company)
        <div class="info-row">
            <span class="label">Entreprise :</span> {{ $company }}
        </div>
        @endif

        <div class="info-row">
            <span class="label">Sujet :</span> {{ $contactSubject }}
        </div>

        <div class="message-box">
            <p class="label">Message :</p>
            <p>{{ $messageContent }}</p>
        </div>

        <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact du site CITL (Comité Ivoirien des Tests Logiciels)</p>
        </div>
    </div>
</body>
</html>
