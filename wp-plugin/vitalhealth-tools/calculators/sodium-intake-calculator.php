<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_sodium_intake_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="sodium-intake-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Sodium Intake Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age"><?php esc_html_e('Age (years)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age" name="age" placeholder="<?php esc_attr_e('e.g. 30', 'vitalhealth-tools'); ?>" min="2" max="100">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_condition"><?php esc_html_e('Health Condition', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_condition" name="condition">
            <option value="<?php echo esc_attr('none'); ?>"><?php esc_html_e('None', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('hypertension'); ?>"><?php esc_html_e('Hypertension', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('heart_disease'); ?>"><?php esc_html_e('Heart Disease', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('kidney_disease'); ?>"><?php esc_html_e('Kidney Disease', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_sodium_intake_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
