<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
    <title>Confirmation de demande d'accréditation</title>
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
                                                            ✅
                                                        </div>
                                                    </div>
                                                    <h1 style="margin: 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 28px; font-weight: 700; text-align: center; line-height: 1.3;">
                                                        Demande d'Accréditation Reçue
                                                    </h1>
                                                    <p style="margin-top: 10px; color: #666666; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; text-align: center;">
                                                        Organisme de formation ISTQB®
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Success Banner -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #10b981; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 20px 30px; vertical-align: top;">
                                                    <p style="margin: 0; color: #ffffff; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-align: center;">
                                                        ✓ Votre demande a été enregistrée avec succès
                                                    </p>
                                                    <p style="margin-top: 5px; color: rgba(255,255,255,0.9); font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; text-align: center;">
                                                        Date de soumission : {{ $accreditationRequest->created_at->format('d/m/Y à H:i') }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Content -->
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; width: 680px; margin: 0 auto;" width="680">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: 400; text-align: left; padding: 30px; vertical-align: top;">

                                                    <!-- Greeting -->
                                                    <p style="margin: 0 0 20px 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 15px; line-height: 1.6;">
                                                        Bonjour <strong>{{ $accreditationRequest->contact_person }}</strong>,
                                                    </p>
                                                    <p style="margin: 0 0 25px 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 15px; line-height: 1.6;">
                                                        Nous avons bien reçu votre demande d'accréditation pour <strong>{{ $accreditationRequest->company_name }}</strong>.
                                                    </p>

                                                    <!-- Section: Prochaines Étapes -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Prochaines Étapes
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 12px; background-color: #f9f9f9; border-radius: 8px; margin-bottom: 10px;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="width: 40px; vertical-align: top;">
                                                                                <span style="display: inline-block; background-color: #e36c19; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">1</span>
                                                                            </td>
                                                                            <td style="vertical-align: top;">
                                                                                <p style="margin: 0; color: #1a1a1a; font-weight: 600;">Examen de votre dossier</p>
                                                                                <p style="margin: 5px 0 0 0; color: #666666; font-size: 13px;">Notre équipe va examiner attentivement votre demande</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr><td style="height: 10px;"></td></tr>
                                                            <tr>
                                                                <td style="padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="width: 40px; vertical-align: top;">
                                                                                <span style="display: inline-block; background-color: #e36c19; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">2</span>
                                                                            </td>
                                                                            <td style="vertical-align: top;">
                                                                                <p style="margin: 0; color: #1a1a1a; font-weight: 600;">Évaluation</p>
                                                                                <p style="margin: 5px 0 0 0; color: #666666; font-size: 13px;">Le panel d'experts validera le contenu pédagogique conformément aux recommandations de l'ISTQB®</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr><td style="height: 10px;"></td></tr>
                                                            <tr>
                                                                <td style="padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="width: 40px; vertical-align: top;">
                                                                                <span style="display: inline-block; background-color: #e36c19; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">3</span>
                                                                            </td>
                                                                            <td style="vertical-align: top;">
                                                                                <p style="margin: 0; color: #1a1a1a; font-weight: 600;">Décision</p>
                                                                                <p style="margin: 5px 0 0 0; color: #666666; font-size: 13px;">Vous recevrez une réponse dans un délai de 2 à 4 semaines</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Récapitulatif -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Récapitulatif de Votre Demande
                                                        </h3>
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666; width: 40%;">Entreprise</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $accreditationRequest->company_name }}</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Ville</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $accreditationRequest->city }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 8px 0; color: #666666;">Années d'activité</td>
                                                                <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">{{ $accreditationRequest->years_in_business }} an(s)</td>
                                                            </tr>
                                                            <tr style="background-color: #f9f9f9;">
                                                                <td style="padding: 8px; color: #666666;">Nombre de formateurs</td>
                                                                <td style="padding: 8px; color: #1a1a1a; font-weight: 500;">{{ $accreditationRequest->number_of_trainers }}</td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <!-- Section: Contact -->
                                                    <div style="margin-bottom: 25px;">
                                                        <h3 style="margin: 0 0 15px 0; color: #e36c19; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e36c19; padding-bottom: 8px;">
                                                            Besoin d'Aide ?
                                                        </h3>
                                                        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px;">
                                                            <p style="margin: 0 0 10px 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px; line-height: 1.6;">
                                                                Si vous avez des questions concernant votre demande, n'hésitez pas à nous contacter :
                                                            </p>
                                                            <table cellpadding="0" cellspacing="0" style="font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
                                                                <tr>
                                                                    <td style="padding: 5px 0; color: #1a1a1a;">
                                                                        📧 <a href="mailto:contact@citl.ci" style="color: #e36c19; text-decoration: none;">contact@citl.ci</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 5px 0; color: #1a1a1a;">
                                                                        📞 +225 27 22 39 18 67
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <!-- Closing -->
                                                    <p style="margin: 25px 0 15px 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 15px; line-height: 1.6;">
                                                        Nous vous remercions pour votre intérêt à rejoindre le réseau des organismes de formation accrédités CITL.
                                                    </p>
                                                    <p style="margin: 0; color: #1a1a1a; font-family: 'Montserrat', 'Trebuchet MS', Arial, sans-serif; font-size: 15px; line-height: 1.6;">
                                                        Cordialement,<br>
                                                        <strong>L'équipe CITL</strong>
                                                    </p>

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
