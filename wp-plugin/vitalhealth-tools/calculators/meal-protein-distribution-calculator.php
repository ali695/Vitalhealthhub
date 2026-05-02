<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_meal_protein_distribution_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="meal-protein-distribution-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Meal Protein Distribution Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_daily_protein"><?php esc_html_e('Daily Protein Target (g)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_daily_protein" name="daily_protein" placeholder="<?php esc_attr_e('e.g. 150', 'vitalhealth-tools'); ?>" min="20" max="400">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_meals"><?php esc_html_e('Number of Meals', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_meals" name="meals">
            <option value="<?php echo esc_attr('3'); ?>"><?php esc_html_e('3 meals', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('4'); ?>"><?php esc_html_e('4 meals', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('5'); ?>"><?php esc_html_e('5 meals', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('6'); ?>"><?php esc_html_e('6 meals', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_meal_protein_distribution_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
