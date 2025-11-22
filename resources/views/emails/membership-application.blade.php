<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande d'adhésion</title>
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
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: bold;
        }
        .badge-new {
            background-color: #10b981;
            color: white;
        }
        .badge-renewal {
            background-color: #3b82f6;
            color: white;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">Nouvelle Demande d'Adhésion</h1>
        <p style="margin: 10px 0 0 0;">CITL - Comité Ivoirien des Tests Logiciels</p>
    </div>

    <div class="content">
        <div class="section">
            <div class="section-title">Type d'Adhésion</div>
            <div class="info-row">
                <span class="info-value">
                    <span class="badge {{ $application->membership_type === 'new' ? 'badge-new' : 'badge-renewal' }}">
                        {{ $application->membership_type === 'new' ? 'Nouvelle adhésion' : 'Renouvellement' }}
                    </span>
                </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Informations Personnelles</div>
            <div class="info-row">
                <span class="info-label">Prénom :</span>
                <span class="info-value">{{ $application->first_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Nom :</span>
                <span class="info-value">{{ $application->surname }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone :</span>
                <span class="info-value">{{ $application->phone }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email :</span>
                <span class="info-value">{{ $application->email }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Adresse :</span>
                <span class="info-value">{{ $application->address }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Informations Professionnelles</div>
            <div class="info-row">
                <span class="info-label">Entreprise :</span>
                <span class="info-value">{{ $application->company }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Poste :</span>
                <span class="info-value">{{ $application->job_title }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Années d'expérience :</span>
                <span class="info-value">{{ $application->years_of_experience }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Niveau d'Adhésion</div>
            <div class="info-row">
                <span class="info-label">Niveau :</span>
                <span class="info-value">{{ ucfirst($application->membership_level) }}</span>
            </div>
            @if($application->qualification)
            <div class="info-row">
                <span class="info-label">Qualification :</span>
                <span class="info-value">{{ $application->qualification }}</span>
            </div>
            @endif
        </div>

        <div class="section">
            <div class="section-title">Informations Administratives</div>
            <div class="info-row">
                <span class="info-label">Statut :</span>
                <span class="info-value">{{ ucfirst($application->status) }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de soumission :</span>
                <span class="info-value">{{ $application->created_at->format('d/m/Y à H:i') }}</span>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Ceci est un email automatique généré par le système CITL.</p>
        <p>© {{ date('Y') }} CITL - Tous droits réservés</p>
    </div>
</body>
</html>
