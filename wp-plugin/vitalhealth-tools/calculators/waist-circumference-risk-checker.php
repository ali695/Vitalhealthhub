<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_waist_circumference_risk_checker_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="waist-circumference-risk-checker">
    <h3 class="vht-calc-title"><?php esc_html_e('Waist Circumference Risk Checker', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_waist_cm"><?php esc_html_e('Waist Circumference (cm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_waist_cm" name="waist_cm" placeholder="<?php esc_attr_e('e.g. 85', 'vitalhealth-tools'); ?>" min="40" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sex"><?php esc_html_e('Sex', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_sex" name="sex">
            <option value="<?php echo esc_attr('male'); ?>"><?php esc_html_e('Male', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('female'); ?>"><?php esc_html_e('Female', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_waist_circumference_risk_checker('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
