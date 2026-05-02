<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_baby_sleep_needs_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="baby-sleep-needs-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Baby Sleep Needs Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age_months"><?php esc_html_e('Baby Age (months)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age_months" name="age_months" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="0" max="60">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_baby_sleep_needs_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
