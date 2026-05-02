<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_baby_feeding_amount_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="baby-feeding-amount-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Baby Feeding Amount Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age_months"><?php esc_html_e('Baby Age (months)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age_months" name="age_months" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="0" max="12">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Baby Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 5', 'vitalhealth-tools'); ?>" min="1" max="15">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_feed_type"><?php esc_html_e('Feeding Type', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_feed_type" name="feed_type">
            <option value="<?php echo esc_attr('breast'); ?>"><?php esc_html_e('Breast Milk', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('formula'); ?>"><?php esc_html_e('Formula', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_baby_feeding_amount_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
