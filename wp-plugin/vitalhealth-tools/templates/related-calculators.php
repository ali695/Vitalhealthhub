<?php
/**
 * Template Part: Related Calculators
 * Renders a grid of related calculator links beneath a calculator page.
 *
 * @param array $related  Array of calculator slugs to display.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

$related = isset( $related ) ? (array) $related : [];
if ( empty( $related ) ) return;

$registry = vht_get_calculator_registry();
$by_slug  = [];
foreach ( $registry as $calc ) {
    $by_slug[ $calc['slug'] ] = $calc;
}

$items = [];
foreach ( $related as $slug ) {
    if ( isset( $by_slug[ $slug ] ) ) {
        $items[] = $by_slug[ $slug ];
    }
}

if ( empty( $items ) ) return;
?>
<section class="vht-related-calculators">
    <h3 class="vht-related-title"><?php esc_html_e( 'Related Calculators', 'vitalhealth-tools' ); ?></h3>
    <div class="vht-related-grid">
        <?php foreach ( $items as $item ) :
            $page = get_page_by_path( $item['slug'], OBJECT, 'page' );
            if ( ! $page ) continue;
            $url = get_permalink( $page->ID );
        ?>
        <a href="<?php echo esc_url( $url ); ?>" class="vht-related-card">
            <span class="vht-related-card-title"><?php echo esc_html( $item['title'] ); ?></span>
            <span class="vht-related-card-arrow">&#8594;</span>
        </a>
        <?php endforeach; ?>
    </div>
</section>
