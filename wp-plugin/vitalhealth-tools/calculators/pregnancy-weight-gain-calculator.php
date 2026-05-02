<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_pregnancy_weight_gain_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="pregnancy-weight-gain-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Pregnancy Weight Gain Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_pre_bmi"><?php esc_html_e('Pre-Pregnancy BMI', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_pre_bmi" name="pre_bmi" placeholder="<?php esc_attr_e('e.g. 22', 'vitalhealth-tools'); ?>" min="10" max="60">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weeks"><?php esc_html_e('Current Week of Pregnancy', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weeks" name="weeks" placeholder="<?php esc_attr_e('e.g. 20', 'vitalhealth-tools'); ?>" min="1" max="42">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_pregnancy_weight_gain_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
