<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_work_life_balance_score_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="work-life-balance-score-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Work-Life Balance Score Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_work_hours"><?php esc_html_e('Work Hours Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_work_hours" name="work_hours" placeholder="<?php esc_attr_e('e.g. 9', 'vitalhealth-tools'); ?>" min="1" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_leisure_hours"><?php esc_html_e('Leisure/Hobby Hours Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_leisure_hours" name="leisure_hours" placeholder="<?php esc_attr_e('e.g. 2', 'vitalhealth-tools'); ?>" min="0" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sleep_hours"><?php esc_html_e('Sleep Hours Per Night', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sleep_hours" name="sleep_hours" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="2" max="12">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_work_life_balance_score_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
