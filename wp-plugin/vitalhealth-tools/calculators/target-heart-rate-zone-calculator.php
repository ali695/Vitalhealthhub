<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_target_heart_rate_zone_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="target-heart-rate-zone-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Target Heart Rate Zone Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age"><?php esc_html_e('Age (years)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age" name="age" placeholder="<?php esc_attr_e('e.g. 30', 'vitalhealth-tools'); ?>" min="15" max="90">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_resting_hr"><?php esc_html_e('Resting Heart Rate (bpm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_resting_hr" name="resting_hr" placeholder="<?php esc_attr_e('e.g. 65', 'vitalhealth-tools'); ?>" min="30" max="100">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_target_heart_rate_zone_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
