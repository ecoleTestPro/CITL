<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
    <title>{{ $isConfirmation ? 'Confirmation d\'inscription' : 'Nouvelle demande d\'inscription' }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
        #MessageViewBody a { color: inherit; text-decoration: none; }
        p { line-height: inherit; margin: 0; }
        @media (max-width: 680px) {
            .row-content { width: 100% !important; }
            .stack .column { width: 100%; display: block; }
        }
    </style>
</head>
<body style="background-color: #ffe7d9; margin: 0; padding: 0;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffe7d9;">
        <tbody>
            <tr>
                <td>
                    <!-- Header -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #e36c19; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: center; padding: 20px 30px; vertical-align: middle;">
                                                    <p style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; letter-spacing: 1px; margin: 0;">
                                                        CITL - Comité Ivoirien des Tests Logiciels
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Hero Section -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 40px 30px; vertical-align: top;">
                                                    <div style="text-align: center; margin-bottom: 20px;">
                                                        <div style="display: inline-block; background-color: #ffe7d9; border-radius: 50%; width: 80px; height: 80px; line-height: 80px; font-size: 36px;">
                                                            🎓
                                                        </div>
                                                    </div>
                                                    <h1 style="margin: 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 28px; font-weight: 700; text-align: center; line-height: 1.3;">
                                                        @if($isConfirmation)
                                                            Confirmation d'Inscription
                                                        @else
                                                            Nouvelle Demande d'Inscription
                                                        @endif
                                                    </h1>
                                                    <p style="margin-top: 10px; color: #666666; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; text-align: center;">
                                                        Liste des Testeurs Certifiés ISTQB®
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Intro Message -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #1a365d; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 25px 30px; vertical-align: top;">
                                                    <p style="margin: 0; color: #ffffff; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 500; text-align: center; line-height: 1.6;">
                                                        @if($isConfirmation)
                                                            Bonjour <strong>{{ $registration->full_name }}</strong>,<br>
                                                            Nous avons bien reçu votre demande d'inscription à la liste officielle ivoirienne des testeurs de logiciels certifiés.
                                                        @else
                                                            Une nouvelle demande d'inscription a été reçue.<br>
                                                            Veuillez examiner les informations ci-dessous.
                                                        @endif
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Content Sections -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 30px; vertical-align: top;">

                                                    <!-- Section: Informations Personnelles -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Informations Personnelles
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Nom complet</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->full_name }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Adresse</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->address }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Date de naissance</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->date_of_birth->format('d/m/Y') }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Coordonnées -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Coordonnées
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Email</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->email }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Téléphone</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->phone }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Certification -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Informations de Certification
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Certification obtenue</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->certification_label }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">N° de certificat</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->certificate_number }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Centre de test</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->test_center_label }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Date de l'examen</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->exam_date->format('d/m/Y') }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Status Badge -->
                                                    <div style="text-align: center; margin-top: 30px;">
                                                        <span style="display: inline-block; padding: 10px 25px; border-radius: 25px; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; font-weight: 600;
                                                            @switch($registration->status)
                                                                @case('pending')
                                                                    background-color: #fef3cd; color: #856404;
                                                                    @break
                                                                @case('approved')
                                                                    background-color: #d4edda; color: #155724;
                                                                    @break
                                                                @case('rejected')
                                                                    background-color: #f8d7da; color: #721c24;
                                                                    @break
                                                            @endswitch
                                                        ">
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
                                                            @endswitch
                                                        </span>
                                                    </div>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- CTA Section -->
                    @if($isConfirmation)
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffece1; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: center; padding: 40px 30px; vertical-align: top;">
                                                    <h2 style="margin: 0 0 15px 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 22px; font-weight: 700;">
                                                        Merci pour votre confiance !
                                                    </h2>
                                                    <p style="margin: 0 0 25px 0; color: #666666; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 15px;">
                                                        Notre équipe va vérifier vos informations et vous contactera prochainement.
                                                    </p>
                                                    <a href="mailto:contact@citl.ci" style="display: inline-block; background-color: #e36c19; color: #ffffff; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 30px; border-radius: 5px;">
                                                        Nous Contacter
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    @endif

                    <!-- Footer -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffbe98; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: center; padding: 30px; vertical-align: top;">
                                                    <p style="margin: 0 0 15px 0; color: #1a365d; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 12px;">
                                                        Suivez-nous sur les réseaux sociaux
                                                    </p>
                                                    <div style="margin-bottom: 20px;">
                                                        <a href="https://www.facebook.com/citl.ci" style="display: inline-block; margin: 0 5px;"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" width="32" height="32" alt="Facebook" style="display: block;"></a>
                                                        <a href="https://www.linkedin.com/company/citl-ci" style="display: inline-block; margin: 0 5px;"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/linkedin@2x.png" width="32" height="32" alt="LinkedIn" style="display: block;"></a>
                                                    </div>
                                                    <p style="margin: 0; color: #1a365d; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 12px;">
                                                        © {{ date('Y') }} CITL - Comité Ivoirien des Tests Logiciels<br>
                                                        Tous droits réservés
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
