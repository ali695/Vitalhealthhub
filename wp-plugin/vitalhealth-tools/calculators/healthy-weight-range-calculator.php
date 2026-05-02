<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_healthy_weight_range_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="healthy-weight-range-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Healthy Weight Range Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_height_cm"><?php esc_html_e('Height (cm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_height_cm" name="height_cm" placeholder="<?php esc_attr_e('e.g. 170', 'vitalhealth-tools'); ?>" min="100" max="250">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sex"><?php esc_html_e('Sex', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_sex" name="sex">
            <option value="<?php echo esc_attr('male'); ?>"><?php esc_html_e('Male', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('female'); ?>"><?php esc_html_e('Female', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_healthy_weight_range_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
