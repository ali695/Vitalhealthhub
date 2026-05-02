<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_bedtime_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="bedtime-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Bedtime Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_wakeup_h"><?php esc_html_e('Wake-Up Time Hour (24h)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_wakeup_h" name="wakeup_h" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="0" max="23">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_wakeup_m"><?php esc_html_e('Wake-Up Time Minute', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_wakeup_m" name="wakeup_m" placeholder="<?php esc_attr_e('e.g. 0', 'vitalhealth-tools'); ?>" min="0" max="59">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_bedtime_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
