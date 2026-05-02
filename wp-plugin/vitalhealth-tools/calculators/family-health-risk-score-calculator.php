<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_family_health_risk_score_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="family-health-risk-score-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Family Health Risk Score Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_heart_disease"><?php esc_html_e('Family History of Heart Disease?', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_heart_disease" name="heart_disease">
            <option value="<?php echo esc_attr('no'); ?>"><?php esc_html_e('No', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_parent'); ?>"><?php esc_html_e('Yes, parent', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_sibling'); ?>"><?php esc_html_e('Yes, sibling', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_diabetes"><?php esc_html_e('Family History of Diabetes?', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_diabetes" name="diabetes">
            <option value="<?php echo esc_attr('no'); ?>"><?php esc_html_e('No', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_parent'); ?>"><?php esc_html_e('Yes, parent', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_sibling'); ?>"><?php esc_html_e('Yes, sibling', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_cancer"><?php esc_html_e('Family History of Cancer?', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_cancer" name="cancer">
            <option value="<?php echo esc_attr('no'); ?>"><?php esc_html_e('No', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_parent'); ?>"><?php esc_html_e('Yes, parent', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes_sibling'); ?>"><?php esc_html_e('Yes, sibling', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_family_health_risk_score_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
