<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_alcohol_calorie_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="alcohol-calorie-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Alcohol Calorie Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_drink_type"><?php esc_html_e('Drink Type', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_drink_type" name="drink_type">
            <option value="<?php echo esc_attr('beer_pint'); ?>"><?php esc_html_e('Beer (pint)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('wine_glass'); ?>"><?php esc_html_e('Wine (glass 175ml)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('spirit_shot'); ?>"><?php esc_html_e('Spirit (25ml shot)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('cocktail'); ?>"><?php esc_html_e('Cocktail', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_drinks_count"><?php esc_html_e('Number of Drinks', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_drinks_count" name="drinks_count" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="1" max="30">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_alcohol_calorie_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
