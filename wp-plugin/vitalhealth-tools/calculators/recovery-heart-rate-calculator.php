<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_recovery_heart_rate_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="recovery-heart-rate-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Recovery Heart Rate Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_peak_hr"><?php esc_html_e('Peak Heart Rate During Exercise (bpm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_peak_hr" name="peak_hr" placeholder="<?php esc_attr_e('e.g. 170', 'vitalhealth-tools'); ?>" min="80" max="220">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_hr_after_1min"><?php esc_html_e('Heart Rate 1 Minute After Exercise (bpm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_hr_after_1min" name="hr_after_1min" placeholder="<?php esc_attr_e('e.g. 130', 'vitalhealth-tools'); ?>" min="40" max="200">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_recovery_heart_rate_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
