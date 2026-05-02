<?php
/**
 * Index — fallback template, also serves as the blog posts listing.
 */
get_header();
?>

<div class="vhh-archive-header">
    <div class="vhh-container">
        <?php vhh_breadcrumbs(); ?>
        <?php if ( is_home() && ! is_front_page() ) : ?>
            <h1><?php single_post_title(); ?></h1>
        <?php else : ?>
            <h1><?php esc_html_e( 'Latest Wellness Articles', 'vitalhealth-hub' ); ?></h1>
            <p><?php esc_html_e( 'Evidence-based health and wellness guides by Ali Haider.', 'vitalhealth-hub' ); ?></p>
        <?php endif; ?>
    </div>
</div>

<div class="vhh-container">
    <div class="vhh-content-wrap">

        <div class="vhh-main-content">
            <?php if ( have_posts() ) : ?>
                <div class="vhh-blog-grid">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php vhh_post_card( get_post() ); ?>
                    <?php endwhile; ?>
                </div>
                <div class="vhh-pagination">
                    <?php
                    echo paginate_links( [
                        'prev_text' => '&larr;',
                        'next_text' => '&rarr;',
                        'type'      => 'list',
                    ] );
                    ?>
                </div>
            <?php else : ?>
                <p><?php esc_html_e( 'No articles found. Check back soon.', 'vitalhealth-hub' ); ?></p>
            <?php endif; ?>
        </div>

        <aside class="vhh-sidebar" role="complementary">
            <?php
            if ( is_active_sidebar( 'sidebar-blog' ) ) {
                dynamic_sidebar( 'sidebar-blog' );
            } else {
            ?>
            <div class="vhh-sidebar-widget">
                <h3><?php esc_html_e( 'Popular Calculators', 'vitalhealth-hub' ); ?></h3>
                <ul>
                    <?php
                    $pop = [
                        'BMI Calculator'          => '/calculators/bmi-calculator/',
                        'Calorie Calculator'      => '/calculators/calorie-calculator/',
                        'Water Intake Calculator' => '/calculators/water-intake-calculator/',
                        'Sleep Cycle Calculator'  => '/calculators/sleep-cycle-calculator/',
                        'TDEE Calculator'         => '/calculators/tdee-calculator/',
                    ];
                    foreach ( $pop as $l => $p ) {
                        echo '<li><a href="' . esc_url( home_url( $p ) ) . '">' . esc_html( $l ) . '</a></li>';
                    }
                    ?>
                </ul>
            </div>
            <?php } ?>
        </aside>

    </div>
</div>

<?php get_footer();
