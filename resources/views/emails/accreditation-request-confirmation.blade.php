<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de demande d'accréditation</title>
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
            border-radius: 0 0 5px 5px;
        }
        .highlight-box {
            background-color: #fff3cd;
            border-left: 4px solid #e36c19;
            padding: 15px;
            margin: 20px 0;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #e36c19;
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 14px;
        }
        .contact-info {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">Confirmation de Demande d'Accréditation</h1>
        <p style="margin: 10px 0 0 0;">CITL - Comité Ivoirien des Tests Logiciels</p>
    </div>

    <div class="content">
        <p>Bonjour <strong>{{ $accreditationRequest->contact_person }}</strong>,</p>

        <p>Nous avons bien reçu votre demande d'accréditation pour <strong>{{ $accreditationRequest->company_name }}</strong>.</p>

        <div class="highlight-box">
            <p style="margin: 0;"><strong>✓ Votre demande a été enregistrée avec succès</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Date de soumission : {{ $accreditationRequest->created_at->format('d/m/Y à H:i') }}</p>
        </div>

        <div class="section">
            <div class="section-title">Prochaines Étapes</div>
            <ol>
                <li><strong>Examen de votre dossier</strong> - Notre équipe va examiner attentivement votre demande</li>
                <li><strong>Évaluation</strong> - Le panel d'experts validera le contenu pédagogique conformément aux recommandations de l'ISTQB®</li>
                <li><strong>Décision</strong> - Vous recevrez une réponse dans un délai de 2 à 4 semaines</li>
            </ol>
        </div>

        <div class="section">
            <div class="section-title">Récapitulatif de Votre Demande</div>
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Entreprise :</strong> {{ $accreditationRequest->company_name }}</li>
                <li><strong>Ville :</strong> {{ $accreditationRequest->city }}</li>
                <li><strong>Années d'activité :</strong> {{ $accreditationRequest->years_in_business }} an(s)</li>
                <li><strong>Nombre de formateurs :</strong> {{ $accreditationRequest->number_of_trainers }}</li>
            </ul>
        </div>

        <div class="contact-info">
            <p style="margin: 0 0 10px 0; font-weight: bold;">Besoin d'aide ?</p>
            <p style="margin: 0; font-size: 14px;">Si vous avez des questions concernant votre demande, n'hésitez pas à nous contacter :</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
                📧 Email: contact@citl.ci<br>
                📞 Téléphone: +225 XX XX XX XX XX
            </p>
        </div>

        <p style="margin-top: 25px;">Nous vous remercions pour votre intérêt à rejoindre le réseau des organismes de formation accrédités CITL.</p>

        <p>Cordialement,<br>
        <strong>L'équipe CITL</strong></p>
    </div>

    <div class="footer">
        <p>Ceci est un email automatique généré par le système CITL.</p>
        <p>© {{ date('Y') }} CITL - Tous droits réservés</p>
    </div>
</body>
</html>
