<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle inscription à l'examen</title>
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
            min-width: 180px;
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
        <h1 style="margin: 0;">Nouvelle Inscription à l'Examen</h1>
        <p style="margin: 10px 0 0 0;">CITL - Centre d'Inscription aux Tests Logiciels</p>
    </div>

    <div class="content">
        <div class="section">
            <div class="section-title">Type d'Achat</div>
            <div class="info-row">
                <span class="info-value">
                    {{ $registration->purchase_type === 'individual' ? 'Achat individuel' : 'Achat de groupe' }}
                </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Examen Sélectionné</div>
            <div class="info-row">
                <span class="info-value">{{ ucfirst($registration->exam_name) }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Coordonnées du Candidat</div>
            <div class="info-row">
                <span class="info-label">Prénom :</span>
                <span class="info-value">{{ $registration->first_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Nom de famille :</span>
                <span class="info-value">{{ $registration->last_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Intitulé du Poste :</span>
                <span class="info-value">{{ $registration->job_title }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Entreprise/Organisation :</span>
                <span class="info-value">{{ $registration->company }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone :</span>
                <span class="info-value">{{ $registration->phone }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email :</span>
                <span class="info-value">{{ $registration->email }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Adresse</div>
            <div class="info-row">
                <span class="info-label">Adresse Ligne 1 :</span>
                <span class="info-value">{{ $registration->address_line1 }}</span>
            </div>
            @if($registration->address_line2)
            <div class="info-row">
                <span class="info-label">Adresse Ligne 2 :</span>
                <span class="info-value">{{ $registration->address_line2 }}</span>
            </div>
            @endif
            <div class="info-row">
                <span class="info-label">Ville :</span>
                <span class="info-value">{{ $registration->city }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Code Postal :</span>
                <span class="info-value">{{ $registration->postal_code }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Format de l'Examen</div>
            <div class="info-row">
                <span class="info-value">Examen en ligne à domicile</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Inscription au Registre</div>
            <div class="info-row">
                <span class="info-value">
                    {{ $registration->register_in_registry === 'yes' ? 'Oui, j\'accepte d\'être inscrit au registre' : 'Non, je ne souhaite pas être inscrit au registre' }}
                </span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Informations Administratives</div>
            <div class="info-row">
                <span class="info-label">Statut :</span>
                <span class="info-value">{{ ucfirst($registration->status) }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date d'inscription :</span>
                <span class="info-value">{{ $registration->created_at->format('d/m/Y à H:i') }}</span>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Ceci est un email automatique généré par le système CITL.</p>
        <p>© {{ date('Y') }} CITL - Tous droits réservés</p>
    </div>
</body>
</html>
