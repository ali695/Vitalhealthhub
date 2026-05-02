<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_nicotine_savings_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="nicotine-savings-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Nicotine Savings Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_cigarettes_per_day"><?php esc_html_e('Cigarettes Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_cigarettes_per_day" name="cigarettes_per_day" placeholder="<?php esc_attr_e('e.g. 10', 'vitalhealth-tools'); ?>" min="1" max="80">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_pack_price"><?php esc_html_e('Price Per Pack (20 cigarettes) in £', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_pack_price" name="pack_price" placeholder="<?php esc_attr_e('e.g. 14', 'vitalhealth-tools'); ?>" min="1" max="50">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_nicotine_savings_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
