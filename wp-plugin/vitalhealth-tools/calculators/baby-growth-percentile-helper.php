<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_baby_growth_percentile_helper_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="baby-growth-percentile-helper">
    <h3 class="vht-calc-title"><?php esc_html_e('Baby Growth Percentile Helper', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age_months"><?php esc_html_e('Age (months)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age_months" name="age_months" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="0" max="60">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="1" max="30">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sex"><?php esc_html_e('Sex', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_sex" name="sex">
            <option value="<?php echo esc_attr('male'); ?>"><?php esc_html_e('Boy', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('female'); ?>"><?php esc_html_e('Girl', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_baby_growth_percentile_helper('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
