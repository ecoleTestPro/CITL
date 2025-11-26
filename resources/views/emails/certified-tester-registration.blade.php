<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $isConfirmation ? 'Confirmation d\'inscription' : 'Nouvelle demande d\'inscription' }}</title>
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
        .intro {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #e36c19;
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
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
        }
        .status-pending {
            background-color: #fef3cd;
            color: #856404;
        }
        .status-approved {
            background-color: #d4edda;
            color: #155724;
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
        <h1 style="margin: 0;">
            @if($isConfirmation)
                Confirmation d'Inscription
            @else
                Nouvelle Demande d'Inscription
            @endif
        </h1>
        <p style="margin: 10px 0 0 0;">Liste des Testeurs Certifiés ISTQB® - CITL</p>
    </div>

    <div class="content">
        @if($isConfirmation)
        <div class="intro">
            <p style="margin: 0;"><strong>Bonjour {{ $registration->full_name }},</strong></p>
            <p>Nous avons bien reçu votre demande d'inscription à la liste officielle ivoirienne des testeurs de logiciels certifiés.</p>
            <p>Notre équipe va vérifier vos informations et vous contactera prochainement pour confirmer votre inscription.</p>
        </div>
        @else
        <div class="intro">
            <p style="margin: 0;"><strong>Nouvelle demande d'inscription reçue</strong></p>
            <p>Un nouveau candidat souhaite s'inscrire sur la liste officielle des testeurs certifiés.</p>
        </div>
        @endif

        <div class="section">
            <div class="section-title">Informations Personnelles</div>
            <div class="info-row">
                <span class="info-label">Nom complet :</span>
                <span class="info-value">{{ $registration->full_name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Adresse :</span>
                <span class="info-value">{{ $registration->address }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de naissance :</span>
                <span class="info-value">{{ $registration->date_of_birth->format('d/m/Y') }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Coordonnées</div>
            <div class="info-row">
                <span class="info-label">Email :</span>
                <span class="info-value">{{ $registration->email }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone :</span>
                <span class="info-value">{{ $registration->phone }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Informations de Certification</div>
            <div class="info-row">
                <span class="info-label">Certification obtenue :</span>
                <span class="info-value">{{ $registration->certification_label }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Numéro de certificat :</span>
                <span class="info-value">{{ $registration->certificate_number }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Centre de test :</span>
                <span class="info-value">{{ $registration->test_center_label }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de l'examen :</span>
                <span class="info-value">{{ $registration->exam_date->format('d/m/Y') }}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Statut de la Demande</div>
            <div class="info-row">
                <span class="info-label">Statut :</span>
                <span class="info-value">
                    <span class="status-badge status-{{ $registration->status }}">
                        @switch($registration->status)
                            @case('pending')
                                En attente de vérification
                                @break
                            @case('approved')
                                Approuvé
                                @break
                            @case('rejected')
                                Refusé
                                @break
                            @default
                                {{ $registration->status }}
                        @endswitch
                    </span>
                </span>
            </div>
            <div class="info-row">
                <span class="info-label">Date de demande :</span>
                <span class="info-value">{{ $registration->created_at->format('d/m/Y à H:i') }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Consentement :</span>
                <span class="info-value">{{ $registration->consent ? 'Accepté' : 'Non accepté' }}</span>
            </div>
        </div>
    </div>

    <div class="footer">
        @if($isConfirmation)
        <p>Merci de votre confiance envers le CITL.</p>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:contact@citl.ci">contact@citl.ci</a></p>
        @else
        <p>Ceci est un email automatique généré par le système CITL.</p>
        <p>Veuillez vérifier les informations et traiter cette demande.</p>
        @endif
        <p>© {{ date('Y') }} CITL - Comité Ivoirien des Tests Logiciels</p>
    </div>
</body>
</html>
