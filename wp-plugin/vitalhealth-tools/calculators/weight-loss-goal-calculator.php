<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_weight_loss_goal_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="weight-loss-goal-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Weight Loss Goal Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_current_weight"><?php esc_html_e('Current Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_current_weight" name="current_weight" placeholder="<?php esc_attr_e('e.g. 80', 'vitalhealth-tools'); ?>" min="30" max="300">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_goal_weight"><?php esc_html_e('Goal Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_goal_weight" name="goal_weight" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="300">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weekly_deficit"><?php esc_html_e('Weekly Calorie Deficit', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_weekly_deficit" name="weekly_deficit">
            <option value="<?php echo esc_attr('3500'); ?>"><?php esc_html_e('Mild (3,500 cal/week)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('7000'); ?>"><?php esc_html_e('Moderate (7,000 cal/week)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('10500'); ?>"><?php esc_html_e('Aggressive (10,500 cal/week)', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_weight_loss_goal_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
