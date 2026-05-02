<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_fertile_window_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="fertile-window-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Fertile Window Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_last_period"><?php esc_html_e('First Day of Last Period (YYYY-MM-DD)', 'vitalhealth-tools'); ?></label>
            <input type="text" id="<?php echo esc_attr($uid); ?>_last_period" name="last_period" placeholder="<?php esc_attr_e('e.g. 2024-01-01', 'vitalhealth-tools'); ?>">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_cycle_length"><?php esc_html_e('Average Cycle Length (days)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_cycle_length" name="cycle_length" placeholder="<?php esc_attr_e('e.g. 28', 'vitalhealth-tools'); ?>" min="21" max="40">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_fertile_window_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
