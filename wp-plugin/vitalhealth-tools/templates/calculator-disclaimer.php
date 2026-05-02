<?php
/**
 * Template Part: Calculator Disclaimer
 * Renders the standard medical disclaimer beneath every calculator.
 */
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<div class="vht-disclaimer-block" role="note" aria-label="<?php esc_attr_e( 'Medical Disclaimer', 'vitalhealth-tools' ); ?>">
    <p class="vht-disclaimer-icon">&#9888;</p>
    <div class="vht-disclaimer-text">
        <strong><?php esc_html_e( 'Medical Disclaimer', 'vitalhealth-tools' ); ?></strong>
        <p><?php esc_html_e(
            'The results provided by this calculator are for general informational and educational purposes only. They do not constitute medical advice, diagnosis, or treatment. Individual results will vary. Always consult a qualified healthcare professional, doctor, or registered dietitian before making any changes to your diet, exercise routine, or health regimen.',
            'vitalhealth-tools'
        ); ?></p>
    </div>
</div>
