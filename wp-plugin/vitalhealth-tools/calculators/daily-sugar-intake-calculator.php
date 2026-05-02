<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_daily_sugar_intake_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="daily-sugar-intake-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Daily Sugar Intake Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_age"><?php esc_html_e('Age (years)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_age" name="age" placeholder="<?php esc_attr_e('e.g. 30', 'vitalhealth-tools'); ?>" min="2" max="100">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sex"><?php esc_html_e('Sex', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_sex" name="sex">
            <option value="<?php echo esc_attr('male'); ?>"><?php esc_html_e('Male', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('female'); ?>"><?php esc_html_e('Female', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_goal"><?php esc_html_e('Health Goal', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_goal" name="goal">
            <option value="<?php echo esc_attr('general'); ?>"><?php esc_html_e('General Health', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('weight_loss'); ?>"><?php esc_html_e('Weight Loss', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('diabetes'); ?>"><?php esc_html_e('Diabetes Management', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_daily_sugar_intake_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
