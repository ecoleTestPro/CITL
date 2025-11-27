<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
    <title>Nouvelle inscription à l'examen</title>
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
                                                            📝
                                                        </div>
                                                    </div>
                                                    <h1 style="margin: 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 28px; font-weight: 700; text-align: center; line-height: 1.3;">
                                                        Nouvelle Inscription à l'Examen
                                                    </h1>
                                                    <p style="margin-top: 10px; color: #666666; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; text-align: center;">
                                                        Certification ISTQB®
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Purchase Type Banner -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #1a365d; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 25px 30px; vertical-align: top;">
                                                    <p style="margin: 0; color: #ffffff; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 18px; font-weight: 600; text-align: center;">
                                                        {{ $registration->purchase_type === 'individual' ? '👤 Achat individuel' : '👥 Achat de groupe' }}
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

                                                    <!-- Section: Examen -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Examen Sélectionné
                                                        </h3>
                                                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center;">
                                                            <p style="margin: 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 18px; font-weight: 600;">
                                                                {{ ucfirst($registration->exam_name) }}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <!-- Section: Candidat -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Coordonnées du Candidat
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Prénom</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->first_name }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Nom de famille</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->last_name }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Intitulé du poste</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->job_title }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Entreprise</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->company }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Téléphone</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->phone }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Email</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->email }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Adresse -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Adresse
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Adresse Ligne 1</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->address_line1 }}</td>
                                                            </tr>
                                                            @if($registration->address_line2)
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Adresse Ligne 2</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->address_line2 }}</td>
                                                            </tr>
                                                            @endif
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Ville</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $registration->city }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Code postal</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $registration->postal_code }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Options -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Options
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Format de l'examen</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">Examen en ligne à domicile</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Inscription au registre</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">
                                                                    {{ $registration->register_in_registry === 'yes' ? '✓ Oui' : '✕ Non' }}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Status -->
                                                    <div style="text-align: center; margin-top: 30px;">
                                                        <span style="display: inline-block; padding: 10px 25px; border-radius: 25px; background-color: #fef3cd; color: #856404; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; font-weight: 600;">
                                                            {{ ucfirst($registration->status) }} - {{ $registration->created_at->format('d/m/Y à H:i') }}
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
                                                        Ceci est un email automatique généré par le système CITL.
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
