<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande d'accréditation</title>
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
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #e36c19;
            margin-bottom: 10px;
            border-bottom: 2px solid #e36c19;
            padding-bottom: 5px;
        }
        .info-row {
            display: flex;
            margin-bottom: 8px;
        }
        .info-label {
            font-weight: bold;
            min-width: 200px;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">Nouvelle Demande d'Accréditation</h1>
        <p style="margin: 10px 0 0 0;">CITL - Comité Ivoirien des Tests Logiciels</p>
    </div>

    <div class="content">
        <div class="section">
            <div class="section-title">Informations sur l'Entreprise</div>
            <div class="info-row">
                <span class="info-label">Nom de l'entreprise :</span>
                <span class="info-value">{{ $accreditationRequest->company_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email :</span>
                <span class="info-value">{{ $accreditationRequest->email }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone :</span>
                <span class="info-value">{{ $accreditationRequest->phone }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Ville :</span>
                <span class="info-value">{{ $accreditationRequest->city }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Adresse :</span>
                <span class="info-value">{{ $accreditationRequest->company_address }}</span>
            </div>
            @if($accreditationRequest->website)
            <div class="info-row">
                <span class="info-label">Site web :</span>
                <span class="info-value">{{ $accreditationRequest->website }}</span>
            </div>
            @endif
        </div>

        <div class="section">
            <div class="section-title">Personne de Contact</div>
            <div class="info-row">
                <span class="info-label">Nom complet :</span>
                <span class="info-value">{{ $accreditationRequest->contact_person }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Détails de l'Organisation</div>
            <div class="info-row">
                <span class="info-label">Années d'activité :</span>
                <span class="info-value">{{ $accreditationRequest->years_in_business }} an(s)</span>
            </div>
            <div class="info-row">
                <span class="info-label">Nombre de formateurs :</span>
                <span class="info-value">{{ $accreditationRequest->number_of_trainers }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Installations de Formation</div>
            <div class="info-row">
                <span class="info-value" style="white-space: pre-line;">{{ $accreditationRequest->training_facilities }}</span>
            </div>
        </div>

        @if($accreditationRequest->additional_info)
        <div class="section">
            <div class="section-title">Informations Complémentaires</div>
            <div class="info-row">
                <span class="info-value" style="white-space: pre-line;">{{ $accreditationRequest->additional_info }}</span>
            </div>
        </div>
        @endif

        <div class="section">
            <div class="section-title">Informations Administratives</div>
            <div class="info-row">
                <span class="info-label">Statut :</span>
                <span class="info-value">{{ ucfirst($accreditationRequest->status) }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de la demande :</span>
                <span class="info-value">{{ $accreditationRequest->created_at->format('d/m/Y à H:i') }}</span>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Ceci est un email automatique généré par le système CITL.</p>
        <p>© {{ date('Y') }} CITL - Tous droits réservés</p>
    </div>
</body>
</html>
